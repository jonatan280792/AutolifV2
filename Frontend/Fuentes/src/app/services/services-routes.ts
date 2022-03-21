import { Config } from '@config/index';

const { baseUrlMotor } = Config.api;

const ServicesRoutes = {
  getServicios: {
    needsAuth: true,
    url: baseUrlMotor + '/api/management/getServicios',
  },
  getMarcas: {
    needsAuth: true,
    url: baseUrlMotor + '/api/management/getMarcas',
  },
  getFactura: {
    needsAuth: true,
    url: baseUrlMotor + '/api/management/getFactura/:id',
  },
  getFacturas_Detalle: {
    needsAuth: true,
    url: baseUrlMotor + '/api/management/getFacturas_Detalle',
  },
  setFactura: {
    needsAuth: true,
    url: baseUrlMotor + '/api/management/setFactura',
  },
  setServicios: {
    needsAuth: true,
    url: baseUrlMotor + '/api/management/setServicios',
  },

  deletetAeronaves: {
    needsAuth: true,
    url: baseUrlMotor + '/api/management/deleteAeronaves?id=:idAeronave',
  },
  deletePilotos: {
    needsAuth: true,
    url: baseUrlMotor + '/api/management/deletePilotos?id=:idPiloto',
  },
  doLogin: {
    needsAuth: false,
    url: baseUrlMotor + '/api/users/doLogin',
  },
  getAeronaves: {
    needsAuth: true,
    url: baseUrlMotor + '/api/management/getAeronaves',
  },  
  getPilotos: {
    needsAuth: true,
    url: baseUrlMotor + '/api/management/getPilotos',
  },
  setAeronaves: {
    needsAuth: true,
    url: baseUrlMotor + '/api/management/setAeronaves',
  },
  setPilotos: {
    needsAuth: true,
    url: baseUrlMotor + '/api/management/setPilotos',
  },
  setReservas: {
    needsAuth: true,
    url: baseUrlMotor + '/api/management/setReservas',
  },
  updateAeronaves: {
    needsAuth: true,
    url: baseUrlMotor + '/api/management/putAeronaves?id=:idAeronave',
  },
  updatePilotos: {
    needsAuth: true,
    url: baseUrlMotor + '/api/management/putPilotos?id=:idPiloto',
  }
};

const buildRoute = (path, params) => {
  const route = Object.assign({}, path);

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      route.url = route.url.replace(new RegExp(':' + key, 'g'), encodeURIComponent(params[key]) );
    }
  }

  return route;
};

export { buildRoute, ServicesRoutes };
