namespace Repository.Helpers
{
    public static class STORE_PROCEDURES
    {
        // Listado de servicios
        public static string GET_SERVICIOS = "core.get_Servicios";
        public static string SET_SERVICIOS = "core.set_Servicios";

        public static string GET_MARCAS = "core.get_Marcas";
        public static string GET_FACTURA = "core.get_Factura";
        public static string GET_FACTURA_DETALLE = "core.get_Facturas_Detalle";
        public static string SET_FACTURA = "core.set_Factura";
        public static string SET_FACTURA_SERVICIOS = "core.set_FacturaServicios";

        // CRUD aeronaves
        public static string GET_AERONAVES = "data.get_Aeronaves";
        public static string SET_AERONAVES = "data.set_Aeronaves";
        public static string PUT_AERONAVES = "data.put_Aeronaves";
        public static string DELETE_AERONAVES = "data.delete_Aeronaves";

        // CRUD pilotos
        public static string GET_PILOTOS = "data.get_Pilotos";
        public static string SET_PILOTOS = "data.set_Pilotos";
        public static string PUT_PILOTOS = "data.put_Pilotos";
        public static string DELETE_PILOTOS = "data.delete_Pilotos";


        public static string SET_RESERVAS = "data.set_Reservas";

        // TOKEN
        public static string GET_LOGIN = "core.get_Login";

    }
}
