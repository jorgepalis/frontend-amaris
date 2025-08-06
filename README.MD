# 🌐 Frontend Next.js - Sistema de Gestión de Fondos

Frontend moderno desarrollado con Next.js, TypeScript y Tailwind CSS que consume la API REST del backend Django. Implementa una interfaz intuitiva para la gestión de fondos de inversión con funcionalidades completas de suscripción, cancelación y consulta de información.

## 🚀 Características Principales

### 📊 **Gestión de Fondos**
- ✅ Listado interactivo de fondos disponibles
- ✅ Detalles completos de cada fondo (nombre, categoría, monto mínimo)
- ✅ Suscripción a fondos con validación en tiempo real
- ✅ Cancelación de suscripciones activas
- ✅ Visualización de estado de inversiones

### 👤 **Dashboard de Usuario**
- ✅ Información personal del usuario
- ✅ Saldo disponible actualizado en tiempo real
- ✅ Fondos activos con detalles de inversión
- ✅ Historial completo de transacciones
- ✅ Gestión de preferencias de notificación

### 🔔 **Sistema de Notificaciones**
- ✅ Configuración de preferencias (Email/SMS)
- ✅ Notificaciones en tiempo real de transacciones
- ✅ Interfaz intuitiva para cambio de preferencias

### 🎨 **Interfaz de Usuario**
- ✅ **Design System moderno** con Tailwind CSS
- ✅ **Responsive Design** - Compatible con móviles y escritorio
- ✅ **Componentes reutilizables** - Arquitectura escalable
- ✅ **Loading States** - Feedback visual en todas las operaciones
- ✅ **Error Handling** - Manejo elegante de errores de API

## 🛠️ Tecnologías Utilizadas

- **Next.js 14** - Framework React con App Router
- **TypeScript** - Tipado estático para mayor seguridad
- **Tailwind CSS** - Framework CSS utilitario
- **React Hooks** - Estado y efectos modernos
- **Fetch API** - Comunicación con backend REST
- **ESLint + Prettier** - Calidad y formato de código

## 📡 Integración con Backend

### **Configuración de API:**
El frontend se conecta al backend Django REST API:

```typescript
// Configuración base de la API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

// Endpoints principales
const ENDPOINTS = {
  funds: '/funds/',
  user: '/user/',
  userBalance: '/user/balance/',
  userFunds: '/user/funds/',
  userTransactions: '/user/transactions/',
  userNotifications: '/user/notifications/'
}
```

### **Funcionalidades Implementadas:**

1. **Gestión de Fondos:**
   - Listado: `GET /api/funds/`
   - Detalle: `GET /api/funds/{id}/`
   - Suscripción: `POST /api/funds/{id}/subscribe/`
   - Cancelación: `POST /api/funds/{id}/cancel/`

2. **Información de Usuario:**
   - Perfil: `GET /api/user/`
   - Saldo: `GET /api/user/balance/`
   - Fondos activos: `GET /api/user/funds/`
   - Historial: `GET /api/user/transactions/`

3. **Preferencias:**
   - Consultar: `GET /api/user/notifications/`
   - Actualizar: `PUT /api/user/notifications/`

## 🔧 Configuración e Instalación Local

### **1. Clonar el Proyecto**
```bash
# Navegar al directorio del frontend
cd frontend
```

### **2. Instalar Dependencias**
```bash
# Instalar dependencias de Node.js
npm install

# O usando yarn
yarn install
```

### **3. Configurar Variables de Entorno**
Crear archivo `.env.local` en la raíz del frontend:
```env
# URL del backend API
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Configuración de producción (opcional)
NEXT_PUBLIC_API_URL_PROD=https://api.tudominio.com/api
```

### **4. Ejecutar en Modo Desarrollo**
```bash
# Iniciar servidor de desarrollo
npm run dev

# O usando yarn
yarn dev

# La aplicación estará disponible en: http://localhost:3000
```

### **5. Scripts Disponibles**

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo en puerto 3000

# Construcción
npm run build        # Generar build de producción
npm run start        # Servidor de producción

# Calidad de código
npm run lint         # Ejecutar ESLint
npm run lint:fix     # Corregir errores de ESLint automáticamente

# Exportación estática (para despliegue)
npm run export       # Generar sitio estático en carpeta /out
```

## 📱 Estructura de Componentes

```
frontend/
├── app/                     # App Router de Next.js 14
│   ├── components/         # Componentes reutilizables
│   │   ├── FundCard.tsx   # Tarjeta de fondo individual
│   │   ├── UserDashboard.tsx # Dashboard principal
│   │   ├── TransactionHistory.tsx # Historial de transacciones
│   │   └── NotificationSettings.tsx # Configuración de notificaciones
│   ├── funds/             # Páginas de fondos
│   │   ├── page.tsx       # Listado de fondos
│   │   └── [id]/page.tsx  # Detalle de fondo
│   ├── dashboard/         # Dashboard de usuario
│   │   └── page.tsx       # Página principal del dashboard
│   ├── globals.css        # Estilos globales con Tailwind
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página de inicio
├── public/                # Archivos estáticos
├── types/                 # Definiciones TypeScript
│   ├── fund.ts           # Tipos para fondos
│   ├── user.ts           # Tipos para usuario
│   └── transaction.ts    # Tipos para transacciones
├── lib/                   # Utilidades
│   ├── api.ts            # Cliente de API
│   └── utils.ts          # Funciones auxiliares
├── next.config.js         # Configuración de Next.js
├── tailwind.config.js     # Configuración de Tailwind
├── tsconfig.json          # Configuración de TypeScript
└── package.json           # Dependencias y scripts
```

## 🚀 Despliegue en AWS con CloudFormation

### **Prerequisitos AWS:**
- **Cuenta de AWS** con permisos para S3 y CloudFront
- **CLI de AWS** configurado con credenciales apropiadas
- **Dominio registrado** (opcional para SSL personalizado)

### **Paso 1: Generar Build de Producción**

Preparar los archivos estáticos para despliegue:

```bash
# 1. Configurar variable de entorno de producción
echo "NEXT_PUBLIC_API_URL=https://api.tudominio.com/api" > .env.local

# 2. Generar build optimizado
npm run build

# 3. Exportar sitio estático
npm run export

# 4. Verificar que se generó la carpeta /out
ls -la out/
# Debe contener: index.html, _next/, assets/, etc.
```

### **Paso 2: Desplegar Infraestructura con CloudFormation**

1. **Subir la plantilla de CloudFormation:**
   ```bash
   # Desde la consola de AWS CloudFormation
   # 1. Ir a CloudFormation > Create Stack
   # 2. Subir el archivo: frontend/cloudformation/frontend.yaml
   # 3. Configurar parámetros del stack
   ```

2. **Parámetros de la plantilla:**
   - `BucketName`: Nombre único para el bucket S3 (ej: `mi-app-fondos-frontend`)

3. **Ejecutar el stack:**
   ```bash
   # Alternativamente desde CLI
   aws cloudformation create-stack \
     --stack-name frontend-fondos-stack \
     --template-body file://frontend/cloudformation/frontend.yaml \
     --parameters ParameterKey=BucketName,ParameterValue=mi-app-fondos-frontend
   ```

### **Paso 3: Subir Archivos Estáticos a S3**

Una vez creada la infraestructura, subir el contenido de la carpeta `/out`:

```bash
# Sincronizar carpeta out con S3
aws s3 sync ./out s3://nombre-bucket-s3/

# Ejemplo con nombre específico
aws s3 sync ./out s3://mi-app-fondos-frontend/

# Verificar que los archivos se subieron correctamente
aws s3 ls s3://mi-app-fondos-frontend/ --recursive

# Configurar cache headers para optimización (opcional)
aws s3 sync ./out s3://mi-app-fondos-frontend/ \
  --cache-control "public, max-age=31536000" \
  --exclude "*.html" \
  --exclude "*.json"

# Archivos HTML sin cache para actualizaciones rápidas
aws s3 sync ./out s3://mi-app-fondos-frontend/ \
  --cache-control "public, max-age=0, must-revalidate" \
  --include "*.html" \
  --include "*.json"
```

### **Arquitectura de Despliegue:**

```
Internet
   ↓
CloudFront CDN (HTTPS)
   ↓
Origin Access Control (OAC)
   ↓
S3 Bucket (Static Files)
   ↓
Next.js Export (/out)
```

### **Verificación del Despliegue:**

```bash
# Obtener URLs del stack de CloudFormation
aws cloudformation describe-stacks \
  --stack-name frontend-fondos-stack \
  --query 'Stacks[0].Outputs'

# Verificar que el sitio esté funcionando
curl -I https://d1234567890123.cloudfront.net/

# Verificar archivos específicos
curl https://d1234567890123.cloudfront.net/_next/static/css/...
```

### **URLs de la Aplicación:**

- **CloudFront URL:** `https://d1234567890123.cloudfront.net`
- **S3 Website URL:** `http://bucket-name.s3-website-region.amazonaws.com`
- **Páginas principales:**
  - Dashboard: `https://d1234567890123.cloudfront.net/dashboard`
  - Fondos: `https://d1234567890123.cloudfront.net/funds`

## 🔄 Proceso de Actualización

Para actualizar la aplicación después de cambios:

```bash
# 1. Realizar cambios en el código
# 2. Regenerar build
npm run build && npm run export

# 3. Sincronizar con S3
aws s3 sync ./out s3://nombre-bucket-s3/ --delete

# 4. Invalidar cache de CloudFront (opcional)
aws cloudfront create-invalidation \
  --distribution-id E1234567890123 \
  --paths "/*"
```

## 🌐 Configuración de Dominio Personalizado

### **Paso 1: Certificado SSL en ACM**
```bash
# 1. Ir a AWS Certificate Manager (ACM) en us-east-1
# 2. Request certificate para: app.tudominio.com
# 3. Validar por DNS
# 4. Copiar ARN del certificado
```

### **Paso 2: Actualizar CloudFront Distribution**
```bash
# En la consola de CloudFront:
# 1. Editar la distribución creada
# 2. Agregar Alternate Domain Names: app.tudominio.com
# 3. Seleccionar Custom SSL Certificate (ACM)
# 4. Guardar cambios y esperar propagación
```

### **Paso 3: Configurar DNS**
```bash
# En Cloudflare o tu proveedor DNS:
# 1. Crear registro CNAME:
#    - Name: app
#    - Content: d1234567890123.cloudfront.net
# 2. Guardar cambios
```

## 📊 Optimizaciones de Rendimiento

### **Build Optimizations:**
- ✅ **Static Export** - Sitio completamente estático
- ✅ **Code Splitting** - Carga diferida de componentes
- ✅ **Image Optimization** - Imágenes optimizadas automáticamente
- ✅ **Bundle Analysis** - Análisis de tamaño de paquetes
- ✅ **Minification** - CSS y JS minificados

### **CDN Benefits:**
- ✅ **Global Distribution** - CloudFront en múltiples regiones
- ✅ **Edge Caching** - Cache en ubicaciones cercanas al usuario
