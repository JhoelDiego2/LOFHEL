
#include "DHT.h" // adiciona a biblioteca DHT.h ao código

#define TIPO_SENSOR DHT11 // define o tipo de sensor
const int PINO_SENSOR_DHT11 = A5; // define em qual pino o sensor está ligado

DHT sensorDHT(PINO_SENSOR_DHT11, TIPO_SENSOR); // cria um objeto do sensor DHT11

void setup() {
  Serial.begin(9600); // define a velocidade de transmissão
  sensorDHT.begin(); // inicia o sensor para capturar dados

}

void loop() {
  float umidade = sensorDHT.readHumidity() + 15; // variável que recebe os valores da umidade 
  float temperatura = sensorDHT.readTemperature() - 10; // variável que recebe os valores da temperatura


  if (isnan(temperatura) || isnan(umidade)) {
    Serial.println("Erro ao ler os dados do sensor");
  } // Emite um alerta ao não coseguir capturar dados
  
  else {

    Serial.print(umidade);
    Serial.print(";");
    Serial.println(temperatura);

  }

  delay(1000); // delay de 1s para captura de dados


}