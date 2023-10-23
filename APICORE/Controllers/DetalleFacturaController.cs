using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using APICORE.Models;
using System.Data.SqlClient;
using System.Data;
using Microsoft.AspNetCore.Cors;


namespace APICORE.Controllers
{
    [EnableCors("ReglasCors")]
    [Route("api/[controller]")]
    [ApiController]
    public class DetalleFacturaController : ControllerBase
    {
        private readonly string cadenaSQl;
        public DetalleFacturaController(IConfiguration config)
        {
            cadenaSQl = config.GetConnectionString("CadenaSQL");
        }

        [HttpGet]
        [Route("DetalleFactura")]
        public IActionResult detalleFactura(int codFactura)
        {
            List<detalleFactura> lista = new List<detalleFactura>();
            try
            {
                using (var conexion = new SqlConnection(cadenaSQl))
                {
                    conexion.Open();
                    var cmd = new SqlCommand("SELECT * FROM detalleFactura WHERE codFactura = @CodFactura", conexion);
                    cmd.Parameters.AddWithValue("@CodFactura", codFactura);
                    cmd.CommandType = CommandType.Text;
                    using (var rd = cmd.ExecuteReader())
                    {
                        while (rd.Read())
                        {
                            lista.Add(new detalleFactura()
                            {
                                cod = Convert.ToInt32(rd["cod"]),
                                codFactura = Convert.ToInt32(rd["codFactura"]),
                                codProducto = Convert.ToInt32(rd["codProducto"]),
                                nombreProducto = rd["nombreProducto"].ToString(),
                                precio = (double)Convert.ToDouble(rd["precio"]),
                                cantidad = Convert.ToInt32(rd["cantidad"]),
                                subtotal = (double)Convert.ToDouble(rd["subtotal"])
                            });
                        }
                    }
                }
                return StatusCode(StatusCodes.Status200OK, new { mensaje = "Ok", response = lista });
            }
            catch (Exception error)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { mensaje = error.Message, respuesta = lista });
            }
        }



    }
}
