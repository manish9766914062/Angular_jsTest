//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace OData
{
    using System;
    using System.Collections.Generic;
    
    public partial class Product
    {
        public Product()
        {
            this.Order_Details = new HashSet<Order_Detail>();
        }

        [System.ComponentModel.DataAnnotations.Key]
        public int Product_ID { get; set; }
        public Nullable<int> Supplier_ID { get; set; }
        public Nullable<int> Category_ID { get; set; }
        public string Product_Name { get; set; }
        public string English_Name { get; set; }
        public string Quantity_Per_Unit { get; set; }
        public Nullable<decimal> Unit_Price { get; set; }
        public Nullable<short> Units_In_Stock { get; set; }
        public Nullable<short> Units_On_Order { get; set; }
        public Nullable<short> Reorder_Level { get; set; }
        public bool Discontinued { get; set; }
    
        public virtual Category Category { get; set; }
        public virtual ICollection<Order_Detail> Order_Details { get; set; }
        public virtual Supplier Supplier { get; set; }
    }
}
