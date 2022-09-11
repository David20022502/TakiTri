HOla 
![WhatsApp Image 2022-09-10 at 8 09 51 PM](https://user-images.githubusercontent.com/66538886/189507423-52310503-d331-48f4-a494-d83a422fb7d2.jpeg)

# **Trabajo de Integración Curricular:** 

## Carrera: Desarrollo de Software

> ######  **Estudiante:** Bryan Armando Quisaguano Casa
> ######  Perfil: [@BryanArmando](https://github.com/BryanArmando)
## Documentación:
> ######  [Informe Técnico](https://epnecuador-my.sharepoint.com/:b:/g/personal/bryan_quisaguano_epn_edu_ec/ESUEaN2uq6JMp7EMWke1OiIBZ1iuk0XJ8j1sF04tTsbsUg?e=2Uqg4r)
> ######  [Manual de usuario](https://youtu.be/C7QawKLBAb4)
## Accesso a los endpoints de FARMECC. en producción:

> ######  [Endpoints FARMECC](https://farmecc.herokuapp.com/doc/swagger-ui/index.html)
## Ejecución de los endpoints FARMECC (local):

1. Clonar el proyecto
```
git clone https://github.com/BryanArmando/SisEscritorio_FARMECC.git
```

2. Abrir una terminal en la carpeta del proyecto con nombre **loginjwt**, con la finalidad de instalar las dependencias del archivo **pom.xml**, se debe aplicar el comando:
```
mvn install
```

3. Abrir el proyecto en un IDE de preferencia Intellij Idea, con el cual puede suplir el paso anterior ya que descarga las dependencias de forma automática.

4. Dirigirse al archivo **application.properties** ubicado en el directorio **src/main/resources** y colocar las credenciales de la base de datos local a utilizar, por ejemplo:
```
spring.datasource.url=jdbc:mysql://localhost:3306/tubase
spring.datasource.url=root
spring.datasource.password=1234
```
5. Correr el proyecto desde el archivo principal con nombre **LoginjwtApplication**. 

Con ello se inicia el proyecto y se ejecuta de manera local en el puerto 8080 por defecto. 
```
http://localhost:8080
```
Para dirigirse a la vista del proyecto documentado con swagger de manera local ingresar a la dirección:
```
http://localhost:8080/doc/swagger-ui/index.html#/
```
Puede ingresar a la vista local de swagger con el enlace anteriormente mencionado o dar click [aquí](http://localhost:8080/doc/swagger-ui/index.html#/) para abrir directamente

## Ejecución de los sistema de escritorio FARMECC (local):

Recuerde tener instalado la versión de java 11 y el SDK de javafx en este caso la versión [11.0.2](https://drive.google.com/drive/folders/1tnhrI5NrbD-CbebsjR03FJ7EjxeBLmA0?usp=sharing), ademas deben estar debidamente agregadas a sus variables de entorno.

1. Clonar el proyecto
```
git clone https://github.com/BryanArmando/SisEscritorio_FARMECC.git
```
2. Ingresar a la carpeta FarmeccAppEscritorio y abrirla con un IDE de desarrollo, de preferencia Intellij Idea.

3. Todas las librerias implementadas las puede encontrar en la carpeta **driver-PDF** y en caso de encontrar errores en las importaciones, agregue todo el contenido de dicha carpeta como librerias en la estructura del proyecto.

4. Agregue como dependencia la carpeta lib de javafx en los modulos de la estructura del proyecto **>>File >> Project Structure >> modules >> dependencies**

5. En **Run >> Edith configuration** en el espacio de **VM Option** colocar el siguente contenido:
```
--module-path /ruta/javafx/carpeta/lib
--add-modules javafx.controls,javafx.fxml
```
6. Corra el programa desde el archivo principal **Main** ubicado en el paquete **/src/Controlador**
