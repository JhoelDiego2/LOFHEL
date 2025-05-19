// Grupo 3 - LOFHEL - codigo modificado para usar com a api
#include "DHT.h" // adiciona a biblioteca DHT.h ao código

#define TIPO_SENSOR DHT11 // define o tipo de sensor
const int PINO_SENSOR_DHT11 = A3; // define em qual pino o sensor está ligado

DHT sensorDHT(PINO_SENSOR_DHT11, TIPO_SENSOR); // cria um objeto do sensor DHT11

void setup() {
  Serial.begin(9600); // define a velocidade de transmissão
  sensorDHT.begin(); // inicia o sensor para capturar dados
}

void loop() {
  int umidade = sensorDHT.readHumidity() + 20; // variável que recebe os valores da umidade 
  float temperatura = sensorDHT.readTemperature() - 10; // variável que recebe os valores da temperatura

  if (isnan(temperatura) || isnan(umidade)) {
    Serial.println("Erro ao ler os dados do sensor");
  } // Emite um alerta ao não coseguir capturar dados

  else {
    // Label de umidade
    Serial.print(umidade);
    Serial.print(";");
    // Label de temperatura
    Serial.println(temperatura);
  }

  delay(500); // delay de 0.5s para captura de dados

}