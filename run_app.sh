if ! command -v node &> /dev/null; then
  echo "Node.js no está instalado. Por favor, instala Node.js antes de ejecutar esta aplicación."
  exit 1
fi

FRONTEND_DIR="Frontend"

BACKEND_DIR="Backend"

run_app() {
  if ! command -v node &> /dev/null; then
  echo "Node.js no está instalado. Por favor, instala Node.js antes de ejecutar esta aplicación."
  exit 1
  fi
  echo "Instalando dependencias del frontend..."
  cd "$FRONTEND_DIR" || exit
  npm install -D vite
  npm install
  cd ..
  echo "Instalando dependencias del backend..."
  cd "$BACKEND_DIR" || exit
  npm install
  echo "Iniciando Aplicacion..."
  node app.js & cd .. 
  cd "$FRONTEND_DIR" || exit 
  npm run dev
  start http://localhost:5173/
}
run_app
