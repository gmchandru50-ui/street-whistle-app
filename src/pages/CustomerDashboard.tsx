import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MapPin, Search, Star, Clock, Phone, Menu, LogOut, Bell, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  
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
    },
  ]);

  const categories = ["All", "Vegetables", "Fruits"];
  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

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
            placeholder="Search for vegetables, fruits, services..."
            className="pl-10 h-12 bg-card"
          />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="text-center">
            <CardContent className="pt-4 pb-3">
              <p className="text-2xl font-bold text-primary">2</p>
              <p className="text-xs text-muted-foreground">Live Now</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-4 pb-3">
              <p className="text-2xl font-bold text-secondary">5</p>
              <p className="text-xs text-muted-foreground">Favorites</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-4 pb-3">
              <p className="text-2xl font-bold text-accent">3</p>
              <p className="text-xs text-muted-foreground">Today</p>
            </CardContent>
          </Card>
        </div>

        {/* Category Filters */}
        <div>
          <h2 className="text-xl font-bold mb-4">Available Products</h2>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat)}
                className="whitespace-nowrap"
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
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
                    per {product.unit}
                  </span>
                </div>
                <Button className="w-full" size="sm">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Add to Cart
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
              Live Vendor Map
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
              <div className="text-center z-10 space-y-2">
                <MapPin className="h-12 w-12 text-primary mx-auto" />
                <p className="text-muted-foreground font-medium">Interactive Map</p>
                <p className="text-sm text-muted-foreground">Vendors near Sobha Lakeview, Bellandur</p>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              View Full Map
            </Button>
          </CardContent>
        </Card>

        {/* Nearby Vendors */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Nearby Vendors</h2>
            <Button variant="link" className="text-primary">
              View All
            </Button>
          </div>

          <div className="space-y-4">
            {activeVendors.map((vendor) => (
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
                    <Button variant="outline" className="flex-1">
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
    </div>
  );
};

export default CustomerDashboard;
