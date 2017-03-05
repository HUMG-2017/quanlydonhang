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
using MvcApplication1.Filters;

namespace MvcApplication1.Controllers
{
    public class KhoHangController : ApiController
    {
        databaseDataContext db = new databaseDataContext(ConfigurationManager.ConnectionStrings["QLDHConnectionString"].ConnectionString);
        // GET api/<controller>
        [JwtAuthentication]
        public IEnumerable<QuanLyKhoHang> Get()
        {
            string filter = HttpContext.Current.Request.Params.Get("filter");
            if (string.IsNullOrEmpty(filter))
            {
                List<QuanLyKhoHang> lst = (from table in db.QuanLyKhoHangs
                                        select table).ToList();
                return lst;
                //string json = JsonConvert.SerializeObject(lst);
                //return new string[] { json };
            }
            else
            {
                QuanLyKhoHang obj = JsonConvert.DeserializeObject<QuanLyKhoHang>(filter);
                List<QuanLyKhoHang> lst = (from table in db.QuanLyKhoHangs
                                        where
                                            (obj.CapKho == null || obj.CapKho == table.CapKho) &&
                                            (obj.DiaChiKhoHang == null || obj.DiaChiKhoHang == table.DiaChiKhoHang) &&
                                            (obj.TenKho == null || obj.TenKho == table.TenKho) &&
                                            (obj.TinhTrang == null || obj.TinhTrang == table.TinhTrang)
                                        select table).ToList();
                return lst;
                //string json = JsonConvert.SerializeObject(lst);
                //return new string[] { json };
            }
        }

        // GET api/<controller>/5
        public List<QuanLyKhoHang> Get(int id)
        {
            List<QuanLyKhoHang> lst = db.QuanLyKhoHangs.Where(o => o.Id == id).ToList();
            return lst;
            //string json = JsonConvert.SerializeObject(lst);
            //return json;
        }

        // POST api/<controller>
        public void Post([FromBody]QuanLyKhoHang value)
        {
            //QuanLyKhoHang newobj = (QuanLyKhoHang)JsonConvert.DeserializeObject(value);
            db.QuanLyKhoHangs.InsertOnSubmit(value);
            db.SubmitChanges();
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]QuanLyKhoHang value)
        {
            QuanLyKhoHang obj = db.QuanLyKhoHangs.Where(o => o.Id == id).SingleOrDefault();
            QuanLyKhoHang newobj = value;// JsonConvert.DeserializeObject<QuanLyKhoHang>(value);
            if (newobj.TinhTrang != null) obj.TinhTrang = newobj.TinhTrang;
            if (newobj.TenKho != null) obj.TenKho = newobj.TenKho;
            if (newobj.GhiChu != null) obj.GhiChu = newobj.GhiChu;
            if (newobj.DiaChiKhoHang != null) obj.DiaChiKhoHang = newobj.DiaChiKhoHang;
            if (newobj.CapKho != null) obj.CapKho = newobj.CapKho;
            db.SubmitChanges();
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
            QuanLyKhoHang obj = db.QuanLyKhoHangs.Where(o => o.Id == id).SingleOrDefault();
            db.QuanLyKhoHangs.DeleteOnSubmit(obj);
            db.SubmitChanges();
        }
    }
}