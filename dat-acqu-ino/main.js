// importa os bibliotecas necessários
const serialport = require('serialport');
const express = require('express');
const mysql = require('mysql2');

// constantes para configurações
const SERIAL_BAUD_RATE = 9600;
const SERVIDOR_PORTA = 3300;

// habilita ou desabilita a inserção de dados no banco de dados
const HABILITAR_OPERACAO_INSERIR = true;

// função para comunicação serial
const serial = async (
    //valoresSensorAnalogico
    valorestemperatura,
    //valoresSensorAnalogico
    valoresumidade,
) => {

    // conexão com o banco de dados MySQL
    let poolBancoDados = mysql.createPool(
        {
            host: '10.18.32.94',
            user: 'aluno',
            password: 'Sptech#2024',
            database: 'Lofhel',
            port: 3307
        }
    ).promise();

    // lista as portas seriais disponíveis e procura pelo Arduino
    const portas = await serialport.SerialPort.list();
    const portaArduino = portas.find((porta) => porta.vendorId == 2341 && porta.productId == 43);
    if (!portaArduino) {
        throw new Error('O arduino não foi encontrado em nenhuma porta serial');
    }

    // configura a porta serial com o baud rate especificado
    const arduino = new serialport.SerialPort(
        {
            path: portaArduino.path,
            baudRate: SERIAL_BAUD_RATE
        }
    );

    // evento quando a porta serial é aberta
    arduino.on('open', () => {
        console.log(`A leitura do arduino foi iniciada na porta ${portaArduino.path} utilizando Baud Rate de ${SERIAL_BAUD_RATE}`);
    });

    // processa os dados recebidos do Arduino
    arduino.pipe(new serialport.ReadlineParser({ delimiter: '\r\n' })).on('data', async (data) => {
        console.log(data);
        const valores = data.split(';');
        const umidade = parseInt(valores[0]);
        const temperatura = parseFloat(valores[1]);

        valorestemperatura.push(temperatura);
        valoresumidade.push(umidade);

        if (HABILITAR_OPERACAO_INSERIR) {
            const min = -1.5;
            const max = 1.5;
            const intervalo = max - min;

            const random1 = Number((Math.random() * intervalo + min).toFixed(2));
            const random2 = Number((Math.random() * intervalo + min).toFixed(2));

            let temperaturaMinima = 0;
            let temperaturaMaxima = 0;
            let umidadeMinima = 0;
            let umidadeMaxima = 0;
            let fkArmazem = 0;

            try {
                const [rows] = await poolBancoDados.execute(
                    `SELECT g.temperaturaMin, g.temperaturaMax, g.umidadeMin, g.umidadeMax, s.fkArmazem
            FROM grupoVinho AS g 
            JOIN tipoVinho AS t ON g.idGrupoVinho = t.fkGrupoVinho 
            JOIN armazem AS a ON t.fkArmazem = a.idArmazem 
            JOIN sensor AS s ON s.fkArmazem = a.idArmazem 
            WHERE s.idSensor = 1`
                );

                if (rows.length > 0) {
                    const dados = rows[0];
                    temperaturaMinima = dados.temperaturaMin;
                    temperaturaMaxima = dados.temperaturaMax;
                    umidadeMinima = dados.umidadeMin;
                    umidadeMaxima = dados.umidadeMax;
                    fkArmazem = dados.fkArmazem;
                } else {
                    console.log("Nenhum dado encontrado para este sensor.");
                }
            } catch (error) {
                console.error('Erro no SELECT:', error);
                return; 
            }

            const umidadeComVariacao = umidade + random1;
            const temperaturaComVariacao = temperatura + random2;

            try {

                await poolBancoDados.execute(
                    'INSERT INTO Registro (umidade, temperatura, fkSensor) VALUES (?, ?, ?)',
                    [umidadeComVariacao, temperaturaComVariacao, 1]
                );
                console.log("Valores inseridos no banco:", umidadeComVariacao, temperaturaComVariacao);

                if (umidadeComVariacao < umidadeMinima || umidadeComVariacao > umidadeMaxima) {
                    const [resultHistorico] = await poolBancoDados.execute(
                        'INSERT INTO historicoAlertas (tipo, fkArmazem) VALUES (?, ?)',
                        ['umidade fora do padrão', fkArmazem]
                    );

                    const idHistorico = resultHistorico.insertId;
                    console.log("⚠️ Alerta de umidade gerado no histórico! ID:", idHistorico);

                    await poolBancoDados.execute(
                        'INSERT INTO alerta (descricao, status, fkHistorico) VALUES (?, ?, ?)',
                        ['Umidade fora dos limites aceitáveis', 'ativo', idHistorico]
                    );

                    console.log("🚨 Alerta registrado na tabela de alerta!");
                }

            } catch (error) {
                console.error('Erro ao inserir dados ou alerta:', error);
            }
        }

    });

    // evento para lidar com erros na comunicação serial
    arduino.on('error', (mensagem) => {
        console.error(`Erro no arduino (Mensagem: ${mensagem}`)
    });
}

// função para criar e configurar o servidor web
const servidor = (
    valorestemperatura,
    valoresumidade
) => {
    const app = express();

    // configurações de requisição e resposta
    app.use((request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        next();
    });

    // inicia o servidor na porta especificada
    app.listen(SERVIDOR_PORTA, () => {
        console.log(`API executada com sucesso na porta ${SERVIDOR_PORTA}`);
    });

    // define os endpoints da API para cada tipo de sensor
    app.get('/sensores/analogico', (_, response) => {
        return response.json(valorestemperatura);
    });
    app.get('/sensores/digital', (_, response) => {
        return response.json(valoresumidade);
    });
}

// função principal assíncrona para iniciar a comunicação serial e o servidor web
(async () => {
    // arrays para armazenar os valores dos sensores
    const valorestemperatura = [];
    const valoresumidade = [];

    // inicia a comunicação serial
    await serial(
        valorestemperatura,
        valoresumidade
    );

    // inicia o servidor web
    servidor(
        valorestemperatura,
        valoresumidade
    );
})();