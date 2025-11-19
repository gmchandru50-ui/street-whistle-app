import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MapPin, Search, Star, Clock, Phone, Menu, LogOut, Bell, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { CartDrawer } from "@/components/CartDrawer";
import VendorMap from "@/components/VendorMap";
import { useLanguage } from "@/contexts/LanguageContext";
import { useVoiceAccessibility } from "@/contexts/VoiceAccessibilityContext";
import { translations } from "@/translations";
import { LanguageSelector } from "@/components/LanguageSelector";
import { VoiceControl } from "@/components/VoiceControl";

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useLanguage();
  const { announce } = useVoiceAccessibility();
  const t = translations[language];
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState<Array<{ id: number; name: string; price: number; quantity: number; unit: string; vendor: string }>>([]);
  const [selectedVendor, setSelectedVendor] = useState<typeof activeVendors[0] | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [products] = useState([
    { id: 1, name: "Tomatoes", price: 40, unit: "kg", category: "Vegetables", vendor: "Ravi's Vegetables", image: "🍅", inStock: true },
    { id: 2, name: "Onions", price: 30, unit: "kg", category: "Vegetables", vendor: "Ravi's Vegetables", image: "🧅", inStock: true },
    { id: 3, name: "Potatoes", price: 25, unit: "kg", category: "Vegetables", vendor: "Ravi's Vegetables", image: "🥔", inStock: true },
    { id: 4, name: "Carrots", price: 45, unit: "kg", category: "Vegetables", vendor: "Ravi's Vegetables", image: "🥕", inStock: true },
    { id: 5, name: "Cabbage", price: 35, unit: "kg", category: "Vegetables", vendor: "Ravi's Vegetables", image: "🥬", inStock: true },
    { id: 6, name: "Cauliflower", price: 50, unit: "kg", category: "Vegetables", vendor: "Ravi's Vegetables", image: "🥦", inStock: true },
    { id: 7, name: "Apples", price: 120, unit: "kg", category: "Fruits", vendor: "Ravi's Vegetables", image: "🍎", inStock: true },
    { id: 8, name: "Bananas", price: 50, unit: "dozen", category: "Fruits", vendor: "Ravi's Vegetables", image: "🍌", inStock: true },
    { id: 9, name: "Oranges", price: 80, unit: "kg", category: "Fruits", vendor: "Ravi's Vegetables", image: "🍊", inStock: true },
    { id: 10, name: "Mangoes", price: 150, unit: "kg", category: "Fruits", vendor: "Ravi's Vegetables", image: "🥭", inStock: true },
    { id: 11, name: "Grapes", price: 90, unit: "kg", category: "Fruits", vendor: "Ravi's Vegetables", image: "🍇", inStock: true },
    { id: 12, name: "Watermelon", price: 30, unit: "kg", category: "Fruits", vendor: "Ravi's Vegetables", image: "🍉", inStock: true },
    { id: 13, name: "Samosa", price: 20, unit: "piece", category: "Street Food", vendor: "Raju's Street Food", image: "🥟", inStock: true },
    { id: 14, name: "Pani Puri", price: 30, unit: "plate", category: "Street Food", vendor: "Raju's Street Food", image: "🫓", inStock: true },
    { id: 15, name: "Vada Pav", price: 25, unit: "piece", category: "Street Food", vendor: "Raju's Street Food", image: "🍔", inStock: true },
    { id: 16, name: "Dosa", price: 40, unit: "piece", category: "Street Food", vendor: "Raju's Street Food", image: "🫔", inStock: true },
    { id: 17, name: "Bhel Puri", price: 35, unit: "plate", category: "Street Food", vendor: "Raju's Street Food", image: "🥗", inStock: true },
    { id: 18, name: "Canvas", price: 150, unit: "piece", category: "Handicrafts", vendor: "Aruna's Handicrafts", image: "🖼️", inStock: true },
    { id: 19, name: "Paint Set", price: 300, unit: "set", category: "Handicrafts", vendor: "Aruna's Handicrafts", image: "🎨", inStock: true },
    { id: 20, name: "Clay", price: 80, unit: "kg", category: "Handicrafts", vendor: "Aruna's Handicrafts", image: "🏺", inStock: true },
    { id: 21, name: "Craft Beads", price: 120, unit: "pack", category: "Handicrafts", vendor: "Aruna's Handicrafts", image: "📿", inStock: true },
    { id: 22, name: "Wool Yarn", price: 200, unit: "bundle", category: "Handicrafts", vendor: "Aruna's Handicrafts", image: "🧶", inStock: true },
  ]);

  const [activeVendors] = useState([
    {
      id: 1,
      name: "Ravi's Vegetables",
      type: "Vegetables & Fruits",
      rating: 4.5,
      distance: "250m away",
      location: "Near Gate 2, Sobha Lakeview",
      image: "🥬",
      isLive: true,
      coordinates: [77.5946, 12.9716] as [number, number],
    },
    {
      id: 2,
      name: "Kumar's Knife Service",
      type: "Knife Sharpening",
      rating: 4.8,
      distance: "400m away",
      location: "Main Road, Bellandur",
      image: "🔪",
      isLive: true,
      coordinates: [77.6033, 12.9250] as [number, number],
    },
    {
      id: 3,
      name: "Lakshmi Flowers",
      type: "Fresh Flowers",
      rating: 4.6,
      distance: "600m away",
      location: "Temple Street",
      image: "🌺",
      isLive: false,
      coordinates: [77.5850, 12.9650] as [number, number],
    },
    {
      id: 4,
      name: "Suresh's Barber Shop",
      type: "Barber Service",
      rating: 4.7,
      distance: "300m away",
      location: "Market Street, Bellandur",
      image: "💈",
      isLive: true,
      coordinates: [77.6050, 12.9300] as [number, number],
    },
    {
      id: 5,
      name: "Aruna's Handicrafts",
      type: "Handicraft Materials",
      rating: 4.4,
      distance: "500m away",
      location: "Art Corner, HSR Layout",
      image: "🎨",
      isLive: true,
      coordinates: [77.6400, 12.9100] as [number, number],
    },
    {
      id: 6,
      name: "Raju's Street Food",
      type: "Street Food",
      rating: 4.9,
      distance: "350m away",
      location: "Food Court Area, Bellandur",
      image: "🍜",
      isLive: true,
      coordinates: [77.6100, 12.9280] as [number, number],
    },
    {
      id: 7,
      name: "Ramesh Tailor",
      type: "Tailor Service",
      rating: 4.5,
      distance: "450m away",
      location: "Shopping Complex",
      image: "🧵",
      isLive: false,
      coordinates: [77.5900, 12.9800] as [number, number],
    },
    {
      id: 8,
      name: "Quick Laundry",
      type: "Laundry Service",
      rating: 4.3,
      distance: "550m away",
      location: "Residency Road",
      image: "👕",
      isLive: true,
      coordinates: [77.6200, 12.9350] as [number, number],
    },
  ]);

  const categories = ["All", "Vegetables", "Fruits", "Street Food", "Handicrafts"];
  
  // Filter products by category and search query
  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product: typeof products[0]) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
      const message = language === "en" ? `${product.name} quantity increased` :
                      language === "kn" ? `${product.name} ಪ್ರಮಾಣ ಹೆಚ್ಚಿಸಲಾಗಿದೆ` :
                      `${product.name} मात्रा बढ़ाई गई`;
      announce(message);
      toast({
        title: "✅ Updated cart",
        description: message,
      });
    } else {
      setCart([...cart, { 
        id: product.id, 
        name: product.name, 
        price: product.price,
        quantity: 1,
        unit: product.unit,
        vendor: product.vendor
      }]);
      const message = language === "en" ? `${product.name} added to cart` :
                      language === "kn" ? `${product.name} ಕಾರ್ಟ್ಗೆ ಸೇರಿಸಲಾಗಿದೆ` :
                      `${product.name} कार्ट में जोड़ा गया`;
      announce(message);
      toast({
        title: "✅ Added to cart",
        description: message,
      });
    }
  };

  const updateCartQuantity = (id: number, quantity: number) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const removeFromCart = (id: number) => {
    const item = cart.find(c => c.id === id);
    setCart(cart.filter(c => c.id !== id));
    toast({
      title: "Removed from cart",
      description: `${item?.name} removed`,
    });
  };

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Filter vendors based on search query
  const filteredVendors = !searchQuery ? activeVendors : activeVendors.filter(vendor => 
    vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vendor.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vendor.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="bg-card border-b border-border/50 sticky top-0 z-50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
              <span className="text-white font-bold text-lg">PM</span>
            </div>
            <div>
              <h1 className="font-bold text-lg">Welcome, Priya!</h1>
              <p className="text-xs text-muted-foreground">Bellandur, Bangalore</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <VoiceControl />
            <LanguageSelector />
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative group"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag className="h-5 w-5 group-hover:scale-110 transition-transform" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center animate-in zoom-in">
                  {cartItemsCount}
                </span>
              )}
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full" />
            </Button>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder={t.searchPlaceholder}
            className="pl-10 h-12 bg-card"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="text-center">
            <CardContent className="pt-4 pb-3">
              <p className="text-2xl font-bold text-primary">{activeVendors.filter(v => v.isLive).length}</p>
              <p className="text-xs text-muted-foreground">{t.liveNow}</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-4 pb-3">
              <p className="text-2xl font-bold text-secondary">5</p>
              <p className="text-xs text-muted-foreground">{t.favorites}</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-4 pb-3">
              <p className="text-2xl font-bold text-accent">{activeVendors.length}</p>
              <p className="text-xs text-muted-foreground">{t.totalVendors}</p>
            </CardContent>
          </Card>
        </div>

        {/* Category Filters */}
        <div>
          <h2 className="text-xl font-bold mb-4">{t.availableProducts}</h2>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat)}
                className="whitespace-nowrap"
              >
                {cat === "All" ? t.all : cat}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {searchQuery && filteredProducts.length === 0 && filteredVendors.length === 0 && (
          <Card className="border-2">
            <CardContent className="p-8 text-center">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">{t.noResults}</h3>
              <p className="text-muted-foreground">
                Try searching for "{searchQuery}" with different keywords
              </p>
            </CardContent>
          </Card>
        )}
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="border-2 hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="text-4xl mb-2 text-center">{product.image}</div>
                <h3 className="font-bold text-center mb-1">{product.name}</h3>
                <p className="text-center text-sm text-muted-foreground mb-2">
                  {product.vendor}
                </p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-primary">
                    ₹{product.price}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {t.perUnit} {product.unit}
                  </span>
                </div>
                <Button className="w-full" size="sm" onClick={() => addToCart(product)}>
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  {t.addToCart}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Map View */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <MapPin className="h-5 w-5 text-primary" />
              {t.liveVendorMap}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
              <div className="text-center z-10 space-y-2">
                <MapPin className="h-12 w-12 text-primary mx-auto" />
                <p className="text-muted-foreground font-medium">{t.interactiveMap}</p>
                <p className="text-sm text-muted-foreground">{t.vendorsNear} Sobha Lakeview, Bellandur</p>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4" onClick={() => setShowMap(true)}>
              {t.viewFullMap}
            </Button>
          </CardContent>
        </Card>

        {/* Nearby Vendors */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{t.nearbyVendors}</h2>
            <Button variant="link" className="text-primary">
              {t.viewAll}
            </Button>
          </div>

          <div className="space-y-4">
            {filteredVendors.length === 0 && searchQuery && (
              <Card className="border-2">
                <CardContent className="p-8 text-center">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <h3 className="font-semibold text-lg mb-2">{t.noShopsFound}</h3>
                  <p className="text-muted-foreground">
                    {t.tryDifferent}
                  </p>
                </CardContent>
              </Card>
            )}
            {filteredVendors.map((vendor) => (
              <Card key={vendor.id} className="border-2 hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-3xl flex-shrink-0">
                      {vendor.image}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-bold text-lg">{vendor.name}</h3>
                        {vendor.isLive && (
                          <Badge className="bg-secondary text-white">
                            🟢 Live
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{vendor.type}</p>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                          <span className="font-medium">{vendor.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{vendor.distance}</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        {vendor.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button className="flex-1 bg-primary hover:bg-primary/90">
                      <Phone className="mr-2 h-4 w-4" />
                      Call
                    </Button>
                    <Button variant="outline" className="flex-1" onClick={() => setSelectedVendor(vendor)}>
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Alerts */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="h-5 w-5 text-accent" />
              Recent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex gap-3 p-3 bg-muted/30 rounded-lg">
                <div className="text-2xl">🥬</div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Ravi's Vegetables has arrived</p>
                  <p className="text-xs text-muted-foreground">Near Gate 2, Sobha Lakeview • 5 mins ago</p>
                </div>
              </div>
              <div className="flex gap-3 p-3 bg-muted/30 rounded-lg">
                <div className="text-2xl">🔪</div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Kumar's Knife Service nearby</p>
                  <p className="text-xs text-muted-foreground">Main Road, Bellandur • 15 mins ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Logout */}
        <Button
          variant="outline"
          className="w-full mb-8"
          onClick={() => navigate('/')}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>

      {/* Vendor Profile Dialog */}
      <Dialog open={selectedVendor !== null} onOpenChange={(open) => !open && setSelectedVendor(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Vendor Profile</DialogTitle>
          </DialogHeader>
          {selectedVendor && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-4xl">
                  {selectedVendor.image}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-xl">{selectedVendor.name}</h3>
                  <p className="text-muted-foreground">{selectedVendor.type}</p>
                  {selectedVendor.isLive && (
                    <Badge className="bg-secondary text-white mt-2">
                      🟢 Live Now
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                  <span className="font-semibold">{selectedVendor.rating}</span>
                  <span className="text-muted-foreground text-sm">rating</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{selectedVendor.distance}</p>
                    <p className="text-sm text-muted-foreground">{selectedVendor.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  <p className="font-medium">+91 98765 43210</p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-semibold mb-2">About</h4>
                <p className="text-sm text-muted-foreground">
                  Serving fresh {selectedVendor.type.toLowerCase()} to the Bellandur community for over 5 years. 
                  Known for quality products and friendly service.
                </p>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Now
                </Button>
                <Button variant="outline" className="flex-1">
                  Get Directions
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Map Dialog */}
      <Dialog open={showMap} onOpenChange={setShowMap}>
        <DialogContent className="max-w-4xl h-[85vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Live Vendor Map - Bangalore
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-hidden">
            <VendorMap vendors={activeVendors} />
          </div>
        </DialogContent>
      </Dialog>

      <CartDrawer
        open={cartOpen}
        onOpenChange={setCartOpen}
        cart={cart}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
      />
    </div>
  );
};

export default CustomerDashboard;
