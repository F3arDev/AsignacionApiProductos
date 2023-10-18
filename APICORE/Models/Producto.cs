namespace APICORE.Models
{
    public class producto
    {
        public int? codProducto { get; set; }
        public string nombreProducto { get; set; }
        public float? precioVenta { get; set; }
        public float? costoUnitatio { get; set; }
        public int? unidadesExistente { get; set; }
        public int? cantidadMinima { get; set; }
        public int? cantidadMaxima { get; set; }
        public string Estado { get; set; }
    }
}
