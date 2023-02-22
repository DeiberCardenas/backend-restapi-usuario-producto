/* Este código es un módulo de Node.js que exporta un objeto con
varias constantes y configuraciones para ser utilizado en la aplicación 
Cada una de estas configuraciones será utilizada en diferentes partes
de la aplicación para establecer conexiones, configurar algoritmos de seguridad
y definir tiempos de vida de tokens de autenticación y acceso.*/
export default {
    port: 4001, // Define el número de puerto que se utilizará para ejecutar la aplicación.
    dbUri: "mongodb://localhost:27017/rest-api-usuario-producto", /* Establece la dirección URI para conectarse
    a la base de datos MongoDB. En este caso, se utiliza la base de datos "rest-api-usuario-producto"
    alojada localmente en el puerto 27017.*/
    saltWorkFactor: 10, /* Define el factor de trabajo para el algoritmo de hashing de contraseñas bcrypt.
    Este valor determina el número de rondas que se utilizarán para calcular el hash de la contraseña.
    Cuanto mayor sea el valor, más segura será la contraseña, pero también tomará más tiempo calcular el hash.*/
    accessTokenTtl: '15m', /*Establece el tiempo de vida del token de acceso generado por la aplicación.
    En este caso, el tiempo de vida es de 15 minutos.*/
    refreshTokenTtl: '1y', /* Establece el tiempo de vida del token de actualización generado por la aplicación.
    En este caso, el tiempo de vida es de 1 año. */
    publicKey: `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlLeG4T/9ZjaW4EK3nCFE
ZqejwFAiHwtxj+F7W228QPNGEtQv14gXksVb3ok3+KkD2edHg2USWYn/YmX9NQtu
VnYhiV8u9GrdvOhBbNiVn/qxrMxvg32GVMBZJfGXPIsg4zA147GuJlEyG9m6wy5l
kUVs0FeJATA1ZZaWL+u2in/F/m5DQG0sZQRk0iw25v6SNiNHrKMUwZJAUQyRUYci
OCKv1hGS6nTTsh+tMo4ps63KXtqgeaIH0qzZoJ6qNYBGdCcQMmq43I29QRxN1Crh
I8w0GrrcxlplQHx77kCW5svUERkaDpj+fBGecOUhqN1GWMjkYyaic4g/r2tJphEw
KQIDAQAB
-----END PUBLIC KEY-----`, /*Contiene la clave pública utilizada
 para validar los tokens de acceso generados por la aplicación.
 RSA de 2048bit. RECUERDE CAMBIAR ESTA LLAVE SI VA DESPLEGAR LA APP*/
    privateKey:`-----BEGIN RSA PRIVATE KEY-----
MIIEogIBAAKCAQEAlLeG4T/9ZjaW4EK3nCFEZqejwFAiHwtxj+F7W228QPNGEtQv
14gXksVb3ok3+KkD2edHg2USWYn/YmX9NQtuVnYhiV8u9GrdvOhBbNiVn/qxrMxv
g32GVMBZJfGXPIsg4zA147GuJlEyG9m6wy5lkUVs0FeJATA1ZZaWL+u2in/F/m5D
QG0sZQRk0iw25v6SNiNHrKMUwZJAUQyRUYciOCKv1hGS6nTTsh+tMo4ps63KXtqg
eaIH0qzZoJ6qNYBGdCcQMmq43I29QRxN1CrhI8w0GrrcxlplQHx77kCW5svUERka
Dpj+fBGecOUhqN1GWMjkYyaic4g/r2tJphEwKQIDAQABAoIBADN03QKLNY5sTQAD
law8BoLOdmZQU74SI5T5G8miyoReqFxTdspImH98MjFpoSg0stRupdvc2OCKUwck
6tuzvNXFwgzaFlETuO1oH1seBYd5Ioj7o4oHoLcqZq4uTXnxWcvCHqNOE0fGyGPC
jlCCeToun1vnLcxvdcpUtFqYYGzDCO8wZ1E3ZXqcA++XWjYcq7jTC0du7RZTA+t4
kT3Ptsj01CI3fscPeyghyQ79MyNjMFRXmJTB3UwXaGIIm5YyyYBt4mmDxcrmS4S2
p9+BmdgPXUqhQ5qE8+f5uRFkx16Dk7RPzgfclky6e0A43TDiijgev50+UN2rvyrT
+DidBlECgYEA3wQrqQjz1Z6jSZWdnKuSKjKMwrlBGIBjhuL35uoeolQJPPAdIUvZ
HYcKcoRHHMG7o7YHH7xcT0Pi9amBGDSEdyXNetTmq4zVpf3I/vPI68XLuwWQTad8
EIIAdTykMzMQdcqP14a4O7NuGnLJK13OlKtraR6A9pBsRprF9d1KPHsCgYEAqrY8
v63wB1HPWmq3Z6OGZYNxn8qrrVmFfhCCEzvR771QKvj4c59w1OzYQK2THhk0/OTL
83tE4ohStqfaLS4GPqEKet1Jt0FnL5Gx6EDeTtnyUsQrWMDA0MhD7aQiDFRe0JJF
fyLrqiho5qHOI5ypJOPcG3F3liqWV2LqBezvPqsCgYALm3j2REwEm0weYVYhuGBU
J+thmyjDMLN9asTCVP8hLcSJUmoBuKPlQIkPqsjUu1Sb0baPNUuMqJjgdmEMtHcM
iIAoW3piBWN9Tzct5dxYQSQ4aLK5B/WSGmIRuAVH0OmTZ+aSriVanh0l7UGBK1G8
NSvS/c5yhtPL3PRetpTNjwKBgGfH9lKJSd0JTUeojOtCrJfWOyNrsMboH5GuM4XB
3jUjIDOfvFt+WLf5bNaVL1Ui+eWsqpjRHeWh/rbwgGDrE/zLJnXfRctUxYhTyJZr
qTrCoODURY3lUNMcjL9SAyj/ucyOwBU0g5SkkHF1eL6JpQK6S7ubVZpDNbbWeXM0
wZWVAoGAfmjEKAVPRRoMfQObS2204oLrKhXhsu4OL72c/1HQUnogo6dbWrJiEkvK
ZH+kcBv3V53f493whjSmDSbhFHZiv6RQN5WxFqLUIQCeY6UYfvkpaieZyGsdbjaH
6mBEaTr0OK7yTHCeKyA8SFb+vV3gqNkM0S80qHVXY5eyYBH3lGw=
-----END RSA PRIVATE KEY-----` /*Contiene la clave privada utilizada
para firmar los tokens de acceso generados por la aplicación. 
RSA de 2048bit. RECUERDE CAMBIAR ESTA LLAVE SI VA DESPLEGAR LA APP*/
}