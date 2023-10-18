using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using APICORE.Models;
using System.Data.SqlClient;
using System.Data;


namespace APICORE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductoController : ControllerBase
    {
        private readonly string cadenaSQl;
        public ProductoController(IConfiguration config)
        {
            cadenaSQl = config.GetConnectionString("CadenaSQL");
        }

        [HttpGet]
        [Route("Lista")]
        public IActionResult Lista()
        {
            List<producto> lista = new List<producto>();
            try
            {
                using (var conexion = new SqlConnection(cadenaSQl))
                {
                    conexion.Open();
                    var cmd = new SqlCommand("select top 10 * from producto", conexion);
                    cmd.CommandType = CommandType.Text;
                    using (var rd = cmd.ExecuteReader())
                    {
                        while (rd.Read())
                        {
                            lista.Add(new producto()
                            {
                                codProducto = Convert.ToInt32(rd["codProducto"]),
                                nombreProducto = rd["nombreProducto"].ToString(),
                                precioVenta = (float)Convert.ToDouble(rd["precioVenta"]),
                                costoUnitatio = (float)Convert.ToDouble(rd["costoUnitatio"]),
                                unidadesExistente = Convert.ToInt32(rd["unidadesExistente"]),
                                cantidadMinima = Convert.ToInt32(rd["costoUnitatio"]),
                                cantidadMaxima = Convert.ToInt32(rd["precioVenta"]),
                                Estado = rd["Estado"].ToString(),
                            });
                        }
                    }
                }
                return StatusCode(StatusCodes.Status200OK, new { mensaje = "Ok", response = lista });
            } catch (Exception error)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { mensaje = error.Message, respuesta = lista });
            }
        }

        [HttpGet]
        [Route("Obtener/{codProducto:int}")]
        public IActionResult Obtener(int codProducto)
        {
            List<producto> lista = new List<producto>();
            producto c = new producto();
            try
            {
                using (var conexion = new SqlConnection(cadenaSQl))
                {
                    conexion.Open();
                    var cmd = new SqlCommand("select * from Producto", conexion);
                    cmd.CommandType = CommandType.Text;
                    using (var rd = cmd.ExecuteReader())
                    {
                        while (rd.Read())
                        {
                            lista.Add(new producto()
                            {
                                codProducto = Convert.ToInt32(rd["codProducto"]),
                                nombreProducto = rd["nombreProducto"].ToString(),
                                precioVenta = (float)Convert.ToDouble(rd["precioVenta"]),
                                costoUnitatio = (float)Convert.ToDouble(rd["costoUnitatio"]),
                                unidadesExistente = Convert.ToInt32(rd["unidadesExistente"]),
                                cantidadMinima = Convert.ToInt32(rd["costoUnitatio"]),
                                cantidadMaxima = Convert.ToInt32(rd["precioVenta"]),
                                Estado = rd["Estado"].ToString(),
                            });
                        }
                    }
                }
                c = lista.Where(item => item.codProducto == codProducto).FirstOrDefault();
                return StatusCode(StatusCodes.Status200OK, new { mensaje = "Ok", response = c });
            }
            catch (Exception error)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { mensaje = error.Message, respuesta = c });
            }
        }


        [HttpPost]
        [Route("Guardar")]
        public IActionResult Guardar([FromBody] producto c)
        {
            try
            {
                using (var conexion = new SqlConnection(cadenaSQl))
                {
                    conexion.Open();
                    var cmd = new SqlCommand("Insert into Producto(nombreProducto, precioVenta, costoUnitatio, unidadesExistente, cantidadMinima, cantidadMaxima, Estado) " +
                                            "values(@Param1, @Param2, @Param3, @Param4, @Param5, @Param6, @Param7)", conexion);
                    cmd.Parameters.AddWithValue("@Param1", c.nombreProducto);
                    cmd.Parameters.AddWithValue("@Param2", c.precioVenta);
                    cmd.Parameters.AddWithValue("@Param3", c.costoUnitatio);
                    cmd.Parameters.AddWithValue("@Param4", c.unidadesExistente);
                    cmd.Parameters.AddWithValue("@Param5", c.cantidadMinima);
                    cmd.Parameters.AddWithValue("@Param6", c.cantidadMaxima);
                    cmd.Parameters.AddWithValue("@Param7", c.Estado);
                    cmd.CommandType = CommandType.Text;
                    cmd.ExecuteNonQuery();
                }
                return StatusCode(StatusCodes.Status200OK, new { mensaje = "Ok" });
            }
            catch (Exception error)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { mensaje = error.Message });
            }
        }

        [HttpDelete]
        [Route("Eliminar/{codProducto:int}")]
        public IActionResult Eliminar(int codProducto)
        {
            try
            {
                using (var conexion = new SqlConnection(cadenaSQl))
                {
                    conexion.Open();
                    var cmd = new SqlCommand("delete from producto" +
                        "                     where codProducto = @Param1", conexion);
                    cmd.Parameters.AddWithValue("@Param1", codProducto);
                    cmd.CommandType = CommandType.Text;
                    cmd.ExecuteNonQuery();
                }
                return StatusCode(StatusCodes.Status200OK, new { mensaje = "Eliminado" });
            }
            catch (Exception error)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { mensaje = error.Message });
            }
        }


        [HttpPut]
        [Route("Actualizar/{codProducto:int}")]
        public IActionResult Editar([FromBody] producto c)
        {

            try
            {
                using (var conexion = new SqlConnection(cadenaSQl))
                {

                    conexion.Open();
                    var cmd = new SqlCommand(   "Update producto set nombreProducto = @Param2, precioVenta = @Param3," +
                                                "costoUnitatio = @param4, unidadesExistente = @param5, cantidadMinima = @param6, cantidadMaxima = @param7, Estado = @param8" +
                                                "where codProducto = @Param1", conexion);
                                                
                    cmd.Parameters.AddWithValue("@Param1", c.codProducto);
                    cmd.Parameters.AddWithValue("@Param2", c.nombreProducto);
                    cmd.Parameters.AddWithValue("@Param3", c.precioVenta);
                    cmd.Parameters.AddWithValue("@Param4", c.costoUnitatio);
                    cmd.Parameters.AddWithValue("@Param5", c.unidadesExistente);
                    cmd.Parameters.AddWithValue("@Param6", c.cantidadMinima);
                    cmd.Parameters.AddWithValue("@Param7", c.cantidadMaxima);
                    cmd.Parameters.AddWithValue("@Param8", c.Estado);

                    //cmd.Parameters.AddWithValue("@Param1", c.Categoria is null ? DBNull.Value : c.Categoria);
                    //cmd.Parameters.AddWithValue("@Param2", c.nombreCliente is null ? DBNull.Value : c.nombreCliente);
                    //cmd.Parameters.AddWithValue("@Param3", c.apellidoCliente is null ? DBNull.Value : c.apellidoCliente);
                    //cmd.Parameters.AddWithValue("@Param4", c.IdCliente == 0 ? DBNull.Value : c.IdCliente);
                    
                    cmd.CommandType = CommandType.Text;
                    cmd.ExecuteNonQuery();
                }
                return StatusCode(StatusCodes.Status200OK, new { mensaje = "Editado" });
            }
            catch (Exception error)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { mensaje = error.Message });
            }
        }
    }
}
