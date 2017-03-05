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
using System.Web;


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
        public HttpResponseMessage Post([FromBody]QuanLyTaiKhoan user)
        {
            try
            {
                string TaiKhoan = user.TaiKhoan;
                string MatKhau = user.MatKhau;

                databaseDataContext db = new databaseDataContext();

                //QuanLyTaiKhoan result = db.QuanLyTaiKhoans.Where(o => o.TaiKhoan == TaiKhoan).SingleOrDefault();
                var result = (dynamic)null;
                if(TaiKhoan.Equals("admin")){
                   result = db.QuanLyTaiKhoans.Where(taikhoan => taikhoan.TaiKhoan == TaiKhoan).SingleOrDefault();
                }
                else
                {
                    result = db.QuanLyTaiKhoans.Where(taikhoan => taikhoan.TaiKhoan == TaiKhoan).Join(db.QuanLyKhoHangs, taikhoan => taikhoan.IdKhoHang, khohang => khohang.Id, (taikhoan, khohang) => new { taikhoan.Id, taikhoan.IdKhoHang, taikhoan.TaiKhoan, taikhoan.MatKhau, khohang.CapKho }).SingleOrDefault();
                }
                    
                if (result != null) { 
                
                    if (MatKhau.Equals(result.MatKhau))
                    {
                        //Truong hop admin
                        //Cache Session
                        if (TaiKhoan.Equals("admin")){
                            HttpContext.Current.Session.Add("Role", "0");
                            HttpContext.Current.Session.Add("IdStore", "0");
                        }
                        else
                        {
                            HttpContext.Current.Session.Add("IdStore", result.IdKhoHang.ToString());
                            HttpContext.Current.Session.Add("Role", result.CapKho.ToString());
                        }
                       
                        HttpContext.Current.Session.Add("UserName", result.TaiKhoan.ToString());

                        var token = JwtManager.GenerateToken(TaiKhoan);
                        return Request.CreateResponse(HttpStatusCode.OK, token);
                    }

                    HttpError myCustomError = new HttpError("Sai mật khẩu.") { { "CustomErrorCode", 40 } };
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, myCustomError);
                }else {
                    HttpError errTk = new HttpError("Không có tài khoản") { { "CustomErrorCode", 41 } };
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, errTk);
                }

            }
            catch (Exception)
            {
                HttpError myCustomError = new HttpError("Tai khoản và mật khẩu không được trống.") { { "CustomErrorCode", 42 } };
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
