using MvcApplication1.Filters;
using MvcApplication1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json;
using System.Web.Script.Serialization;


namespace MvcApplication1.Controllers
{
    public class DangNhapController : ApiController
    {
        // GET api/dangnhap
        [JwtAuthentication]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/dangnhap/5
        [AllowAnonymous]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/dangnhap
        [AllowAnonymous]
        public HttpResponseMessage Post([FromBody]User user)
        {
            try
            {
                string TaiKhoan = user.TaiKhoan;
                string MatKhau = user.MatKhau;

                databaseDataContext db = new databaseDataContext();

                var result = from table in db.QuanLyTaiKhoans
                           where table.TaiKhoan == TaiKhoan
                           select table;
                if (result.Count() == 1 )
                {
                    string getMatKhau="";
                    foreach (var a in result)
                    {
                        getMatKhau = a.MatKhau;
                    }
                    if (MatKhau.Equals(getMatKhau))
                    {
                        var token = JwtManager.GenerateToken(TaiKhoan);
                        return Request.CreateResponse(HttpStatusCode.OK, token);
                    }
                }

                return Request.CreateResponse(HttpStatusCode.OK,user);
            }
            catch (Exception)
            {
                HttpError myCustomError = new HttpError("Khong co tai khoan hoac mat khau.") { { "CustomErrorCode", 42 } };
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, myCustomError);
                //throw;
            }
            
            //Console.WriteLine(objUser["TaiKhoan"]);
        }

        // PUT api/dangnhap/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/dangnhap/5
        public void Delete(int id)
        {
        }
    }
}
