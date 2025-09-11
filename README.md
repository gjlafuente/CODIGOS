# Gestor de Libros Offline

Ejemplo de aplicación web progresiva que utiliza **Service Worker**, **Cache API** e **IndexedDB** para gestionar una colección de libros sin conexión.

## Uso

1. Sirve los archivos con un servidor estático, por ejemplo:
   ```bash
   npx http-server .
   # o
   python3 -m http.server 8080
   ```
2. Abre `http://localhost:8080` en el navegador.
3. Agrega libros mediante el formulario. Los datos se guardan en IndexedDB y la aplicación continúa funcionando sin conexión tras la primera visita.
