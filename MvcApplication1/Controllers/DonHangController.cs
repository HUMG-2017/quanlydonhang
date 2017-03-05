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
    [JwtAuthentication]
    public class DonHangController : ApiController
    {
        databaseDataContext db = new databaseDataContext(ConfigurationManager.ConnectionStrings["QLDHConnectionString"].ConnectionString);
        // GET api/<controller>
        public IEnumerable<QuanLyDonHang> Get()
        {
            string filter = HttpContext.Current.Request.Params.Get("filter");
            if (string.IsNullOrEmpty(filter))
            {
                List<QuanLyDonHang> lst = (from table in db.QuanLyDonHangs
                                        select table).ToList();
                //string json = JsonConvert.SerializeObject(lst);
                return lst;
                //return new string[] { json };
            }
            else
            {
                QuanLyDonHang obj = JsonConvert.DeserializeObject<QuanLyDonHang>(filter);
                List<QuanLyDonHang> lst = (from table in db.QuanLyDonHangs
                                        where
                                            (obj.KhoHangCuoi == null || obj.KhoHangCuoi == table.KhoHangCuoi) &&
                                            (obj.KhoHangNhan == null || obj.KhoHangNhan == table.KhoHangNhan) &&
                                            (obj.LinkSP == null || obj.LinkSP == table.LinkSP) &&
                                            (obj.MaVanChuyen == null || obj.MaVanChuyen == table.MaVanChuyen)&&
                                            (obj.NgayDatHang == null || obj.NgayDatHang == table.NgayDatHang) &&
                                            (obj.NguoiNhanCuoi == null || obj.NguoiNhanCuoi == table.NguoiNhanCuoi) &&
                                            (obj.OrderNumber == null || obj.OrderNumber == table.OrderNumber) &&
                                            (obj.TaiKhoanDatHang == null || obj.TaiKhoanDatHang == table.TaiKhoanDatHang) &&
                                            (obj.TaiKhoanKhach == null || obj.TaiKhoanKhach == table.TaiKhoanKhach) &&
                                            (obj.TrangThaiDonHang == null || obj.TrangThaiDonHang == table.TrangThaiDonHang) 
                                        select table).ToList();
                return lst;
               // string json = JsonConvert.SerializeObject(lst);
               // return new string[] { json };
            }
        }

        // GET api/<controller>/5
        public List<QuanLyDonHang> Get(int id)
        {
            List<QuanLyDonHang> lst = db.QuanLyDonHangs.Where(o => o.Id == id).ToList();
            return lst;
            //string json = JsonConvert.SerializeObject(lst);
            //return json;
        }

        // POST api/<controller>
        public void Post([FromBody]QuanLyDonHang value)
        {
            //QuanLyDonHang newobj = (QuanLyDonHang)JsonConvert.DeserializeObject(value);
            db.QuanLyDonHangs.InsertOnSubmit(value);
            db.SubmitChanges();
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]QuanLyDonHang value)
        {
            QuanLyDonHang obj = db.QuanLyDonHangs.Where(o => o.Id == id).SingleOrDefault();
            QuanLyDonHang newobj = value;// JsonConvert.DeserializeObject<QuanLyDonHang>(value);
            if (newobj.KhoHangCuoi != null) obj.KhoHangCuoi = newobj.KhoHangCuoi;
            if (newobj.KhoHangNhan != null) obj.KhoHangNhan = newobj.KhoHangNhan;
            if (newobj.LinkSP != null) obj.LinkSP = newobj.LinkSP;
            if (newobj.MaVanChuyen != null) obj.MaVanChuyen = newobj.MaVanChuyen;
            if (newobj.NgayDatHang != null) obj.NgayDatHang = newobj.NgayDatHang;
            if (newobj.NguoiNhanCuoi != null) obj.NguoiNhanCuoi = newobj.NguoiNhanCuoi;
            if (newobj.OrderNumber != null) obj.OrderNumber = newobj.OrderNumber;
            if (newobj.TaiKhoanDatHang != null) obj.TaiKhoanDatHang = newobj.TaiKhoanDatHang;
            if (newobj.TaiKhoanKhach != null) obj.TaiKhoanKhach = newobj.TaiKhoanKhach;
            if (newobj.TenHang != null) obj.TenHang = newobj.TenHang;
            if (newobj.TrangThaiDonHang != null) obj.TrangThaiDonHang = newobj.TrangThaiDonHang;
            if (newobj.TheTich != null) obj.TheTich = newobj.TheTich;
            if (newobj.CanNang != null) obj.CanNang = newobj.CanNang;
            if (newobj.ChuyenPhat != null) obj.ChuyenPhat = newobj.ChuyenPhat;
            if (newobj.CuocVanChuyen != null) obj.CuocVanChuyen = newobj.CuocVanChuyen;
            if (newobj.DatCoc != null) obj.DatCoc = newobj.DatCoc;
            if (newobj.GiaSP != null) obj.GiaSP = newobj.GiaSP;
            if (newobj.GiaSPCanThu != null) obj.GiaSPCanThu = newobj.GiaSPCanThu;
            if (newobj.HangVanChuyen != null) obj.HangVanChuyen = newobj.HangVanChuyen;
            db.SubmitChanges();
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
            QuanLyDonHang obj = db.QuanLyDonHangs.Where(o => o.Id == id).SingleOrDefault();
            db.QuanLyDonHangs.DeleteOnSubmit(obj);
            db.SubmitChanges();
        }
    }
}