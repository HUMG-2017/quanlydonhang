using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using MvcApplication1.Models;
using Newtonsoft.Json;

namespace MvcApplication1.Controllers
{
    public class TaiKhoanController : ApiController
    {
        databaseDataContext db = new databaseDataContext(ConfigurationManager.ConnectionStrings["QLDHConnectionString"].ConnectionString);
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            string filter = HttpContext.Current.Request.Params.Get("filter");
            if (string.IsNullOrEmpty(filter))
            {
                List<QuanLyTaiKhoan> lst = (from table in db.QuanLyTaiKhoans
                                        select table).ToList();
                string json = JsonConvert.SerializeObject(lst);
                return new string[] { json };
            }
            else
            {
                QuanLyTaiKhoan obj = JsonConvert.DeserializeObject<QuanLyTaiKhoan>(filter);
                List<QuanLyTaiKhoan> lst = (from table in db.QuanLyTaiKhoans
                                        where
                                            (obj.IdKhoHang == null || obj.IdKhoHang == table.IdKhoHang) &&
                                            (obj.isFacebook == null || obj.isFacebook == table.isFacebook) &&
                                            (obj.Facebook == null || obj.Facebook == table.Facebook) &&
                                            (obj.Phone == null || obj.Phone == table.Phone) 
                                        select table).ToList();
                string json = JsonConvert.SerializeObject(lst);
                return new string[] { json };
            }
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            List<QuanLyTaiKhoan> lst = db.QuanLyTaiKhoans.Where(o => o.Id == id).ToList();
            string json = JsonConvert.SerializeObject(lst);
            return json;
        }

        // POST api/<controller>
        public void Post([FromBody]string value)
        {
            QuanLyTaiKhoan newobj = (QuanLyTaiKhoan)JsonConvert.DeserializeObject(value);
            db.QuanLyTaiKhoans.InsertOnSubmit(newobj);
            db.SubmitChanges();
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
            QuanLyTaiKhoan obj = db.QuanLyTaiKhoans.Where(o => o.Id == id).SingleOrDefault();
            QuanLyTaiKhoan newobj = JsonConvert.DeserializeObject<QuanLyTaiKhoan>(value);
            if (newobj.IdKhoHang!=null) obj.IdKhoHang = newobj.IdKhoHang;
            if (newobj.isFacebook != null) obj.isFacebook = newobj.isFacebook;
            if (newobj.Mail != null) obj.Mail = newobj.Mail;
            if (newobj.MatKhau != null) obj.MatKhau = newobj.MatKhau;
            db.SubmitChanges();
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
            QuanLyTaiKhoan obj = db.QuanLyTaiKhoans.Where(o => o.Id == id).SingleOrDefault();
            db.QuanLyTaiKhoans.DeleteOnSubmit(obj);
            db.SubmitChanges();
        }
    }
}