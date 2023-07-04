using System.ComponentModel.DataAnnotations;

namespace DarBeya.Models
{
    public class Robe
    {
        public int RobeID { get; set; }
        [Display(Name = "Nom")]
        public string nom { get; set; }
        [Display(Name = "Prix ($)")]
        public float prix { get; set; }
        [Display(Name = "Taille (S, M, L)")]
        public string taille { get; set; }
        [Display(Name = "Type")]
        public string type { get; set; }
        [Display(Name = "Disponible")]
        public bool disponibilite { get; set; }

    }
}
