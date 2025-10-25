import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Minus, Plus, Trash2, Tag } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  unit: string;
  vendor: string;
}

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cart: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
}

export function CartDrawer({ open, onOpenChange, cart, onUpdateQuantity, onRemoveItem }: CartDrawerProps) {
  const { toast } = useToast();
  const [paymentMode, setPaymentMode] = useState("cod");
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);

  const validCoupons = {
    "FRESH10": 10,
    "VEGGIES20": 20,
    "FIRST50": 50,
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = appliedCoupon ? (subtotal * appliedCoupon.discount) / 100 : 0;
  const total = subtotal - discount;

  const handleApplyCoupon = () => {
    const upperCode = couponCode.toUpperCase();
    if (validCoupons[upperCode as keyof typeof validCoupons]) {
      setAppliedCoupon({
        code: upperCode,
        discount: validCoupons[upperCode as keyof typeof validCoupons],
      });
      toast({
        title: "✅ Coupon Applied!",
        description: `You saved ${validCoupons[upperCode as keyof typeof validCoupons]}% on this order`,
      });
    } else {
      toast({
        title: "❌ Invalid Coupon",
        description: "Please enter a valid coupon code",
        variant: "destructive",
      });
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add items to cart before checkout",
        variant: "destructive",
      });
      return;
    }

    const paymentModes = {
      upi: "UPI",
      gpay: "Google Pay",
      phonepe: "PhonePe",
      cod: "Cash on Delivery",
    };

    toast({
      title: "🎉 Order Placed!",
      description: `Payment via ${paymentModes[paymentMode as keyof typeof paymentModes]}. Total: ₹${total.toFixed(2)}`,
    });
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl">Shopping Cart ({cart.length})</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {cart.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-lg">Your cart is empty</p>
              <p className="text-sm mt-2">Add some fresh items!</p>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">{item.vendor}</p>
                      <p className="text-sm font-medium mt-1">₹{item.price}/{item.unit}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-destructive"
                        onClick={() => onRemoveItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Section */}
              <div className="border-t pt-4">
                <Label className="text-sm font-medium flex items-center gap-2 mb-2">
                  <Tag className="h-4 w-4" />
                  Have a Coupon Code?
                </Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleApplyCoupon} variant="secondary">
                    Apply
                  </Button>
                </div>
                {appliedCoupon && (
                  <p className="text-sm text-green-600 mt-2">
                    ✓ {appliedCoupon.code} applied - {appliedCoupon.discount}% off
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-2">
                  Try: FRESH10, VEGGIES20, FIRST50
                </p>
              </div>

              {/* Payment Mode */}
              <div className="border-t pt-4">
                <Label className="text-sm font-medium mb-3 block">Select Payment Mode</Label>
                <RadioGroup value={paymentMode} onValueChange={setPaymentMode}>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi" className="flex-1 cursor-pointer">UPI</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="gpay" id="gpay" />
                    <Label htmlFor="gpay" className="flex-1 cursor-pointer">Google Pay</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="phonepe" id="phonepe" />
                    <Label htmlFor="phonepe" className="flex-1 cursor-pointer">PhonePe</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex-1 cursor-pointer">Cash on Delivery</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Price Summary */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount ({appliedCoupon.discount}%):</span>
                    <span>-₹{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                  <span>Total:</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Button onClick={handleCheckout} className="w-full h-12 text-lg">
                Place Order
              </Button>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
