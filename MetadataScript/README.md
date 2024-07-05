# Metadata Script

A Node.js application designed to interact with the Google Drive API to list and export metadata of PDF files within a specified folder to a CSV file using a service account and perform operations on Google Drive.

The application filters for PDF files in a designated folder, retrieves their metadata (including name, creation time, modified time, owner's display name, and web view link), and formats this information into a CSV file named output.csv.

## Author

David Ruiz

## Date

4th July

## Getting Started

To get this project up and running on your local machine:

\# Download the service account of the link and insert it in the repository.

\# npm run start

### Project challenge

Crear un script que genera un reporte de ficheros usando la API de Google Drive

#

Un cliente necesita sacar un reporte en formato CSV o similar de los documentos de tipo PDF, que tiene almacenados en la carpeta 99 - SD Examen Candidatos Evenbytes

- El ID de la carpeta es 1dK-KbLt9eVC7jw_LXpNdyq6NIHV1jvqu
- El serviceaccount.json tiene acceso de lectura a la carpeta.  

  https://drive.google.com/uc?export=download&id=168AdevJrRUU6NafCHST7iOBOpcn3hIg4

#

El CSV deberá de contener la siguiente información (Ejemplo del fichero CSV esperado como salida)

- Título del documento
- Fecha de creación
- Fecha de última modificación
- Nombre del creador (owner) del documento
- Hipervínculo para acceder al documento

#

Despliegue:

Código desarrollado en Nodejs. 
No es necesario desplegar la solución a ningún entorno.
Únicamente será necesario lanzarlo localmente desde VS Code, línea de comandos o similar.
