namespace APICORE.Models
{
	public class detalleFactura
	{
		public int? cod { get; set; }
		public int? codFactura { get; set; }
		public int? codProducto { get; set; }
		public string nombreProducto { get; set; }
		public double? precio { get; set; }
		public int? cantidad { get; set; }
		public double? subtotal { get; set; }
	}

}