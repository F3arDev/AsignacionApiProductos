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
    public class FacturaController : ControllerBase
    {
        private readonly string cadenaSQl;
        public FacturaController(IConfiguration config)
        {
            cadenaSQl = config.GetConnectionString("CadenaSQL");
        }

        [HttpGet]
        [Route("Lista")]
        public IActionResult Lista()
        {
            List<factura> lista = new List<factura>();
            try
            {
                using (var conexion = new SqlConnection(cadenaSQl))
                {
                    conexion.Open();
                    var cmd = new SqlCommand("select top 10 * from factura", conexion);
                    cmd.CommandType = CommandType.Text;
                    using (var rd = cmd.ExecuteReader())
                    {
                        while (rd.Read())
                        {
                            lista.Add(new factura()
                            {
                                codFactura = Convert.ToInt32(rd["codFactura"]),
                                fecha = Convert.ToDateTime(rd["fecha"]),
                                total = (float)Convert.ToDouble(rd["total"])
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
