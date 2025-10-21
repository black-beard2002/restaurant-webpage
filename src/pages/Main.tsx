import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Moon,
  Sun,
  Facebook,
  Instagram,
  Phone,
  Mail,
  MapPin,
  Clock,
  Calendar,
  Check,
  Menu,
  Star,
} from "lucide-react";

// Shadcn imports
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

import { useItem } from "@/context/ItemProvider";
import { useTheme } from "@/context/ThemeProvider";
import { useCategory } from "@/context/CategoryProvider";
import { useNavigate } from "react-router-dom";
import { handleImageSrc } from "@/utils/helpers";
import Cart from "@/components/Cart";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// =========================
// Loading Skeletons
// =========================
const PopularDishSkeleton = () => (
  <Card className="overflow-hidden">
    <Skeleton className="h-56 w-full" />
    <CardContent className="p-6">
      <div className="flex justify-between items-start mb-2">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-6 w-16" />
      </div>
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-3/4 mb-4" />
      <Skeleton className="h-6 w-20 rounded-full" />
    </CardContent>
  </Card>
);

// =========================
// Contact Section (modernized visuals)
// =========================
const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({ name: "", message: "" });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.name.trim().length === 0) {
      setErrors({ name: "please provide a valid name", message: "" });
      return;
    }
    if (formData.message.trim().length === 0) {
      setErrors({ message: "please provide a valid message", name: "" });
      return;
    }

    setIsSubmitting(true);
    setErrors({ name: "", message: "" });

    await new Promise((resolve) => setTimeout(resolve, 500));

    // ✅ Predefined WhatsApp message
    const text = `${formData.message}\n\n— ${formData.name}`;
    const encodedMessage = encodeURIComponent(text);

    // ✅ Add your restaurant's WhatsApp number here (with country code, no '+')
    const phoneNumber = "15551234567"; // example: +1 (555) 123-4567 → 15551234567

    // ✅ Open WhatsApp chat
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");

    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-20 px-4 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-background via-secondary/30 to-accent/10" />
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />

      <div className="max-w-6xl mx-auto text-center mb-12 relative z-10">
        <Badge
          variant="outline"
          className="mb-4 text-primary border-primary/50 bg-primary/10 backdrop-blur-sm"
        >
          Get In Touch
        </Badge>
        <h3 className="text-4xl md:text-5xl font-serif font-semibold text-foreground">
          Contact <span className="text-primary">Wilma</span>
        </h3>
        <p className="text-muted-foreground mt-2 text-sm md:text-base max-w-2xl mx-auto">
          We'd love to hear from you! Reach out for reservations, feedback, or
          catering inquiries.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto relative z-10">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="backdrop-blur-md bg-linear-to-br from-card/80 to-secondary/30 rounded-2xl shadow-2xl border border-border/30 p-8 hover:shadow-2xl transition-all duration-500"
        >
          {[
            {
              icon: MapPin,
              title: "Address",
              text: "123 Gourmet Street, Culinary District, NY",
            },
            { icon: Phone, title: "Phone", text: "+1 (555) 123-4567" },
            { icon: Mail, title: "Email", text: "info@wilmarestaurant.com" },
            { icon: Clock, title: "Hours", text: "Mon–Sun: 10 AM - 11 PM" },
          ].map(({ icon: Icon, title, text }, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-4 mb-6 p-3 rounded-xl hover:bg-primary/5 transition-colors duration-300"
              whileHover={{ x: 5 }}
            >
              <div className="p-3 rounded-xl bg-linear-to-br from-primary/20 to-primary/10 border border-primary/20">
                <Icon className="text-primary w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{title}</p>
                <p className="text-muted-foreground text-sm">{text}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-linear-to-br from-card/90 to-card/70 rounded-2xl border border-border/30 p-8 shadow-2xl backdrop-blur-md hover:shadow-2xl transition-all duration-500"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="name" className="text-sm font-medium capitalize">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="mt-2 rounded-xl bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>

            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                required
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="mt-2 h-32 rounded-xl bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
              />
              {errors.message && (
                <p className="text-sm text-destructive">{errors.message}</p>
              )}
            </div>
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full mt-4 bg-linear-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

// =========================
// Reservation Section (modern look)
// =========================
const ReservationSection: React.FC = () => {
  const [reservation, setReservation] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitted(false);
  };

  return (
    <section id="reservation" className="py-20 px-4 relative overflow-hidden">
      {/* Background Gradient */}

      <div className="max-w-4xl mx-auto text-center mb-12 relative z-10">
        <Badge
          variant="outline"
          className="mb-4 text-primary border-primary/50 bg-primary/10 backdrop-blur-sm"
        >
          Book Your Table
        </Badge>
        <h3 className="text-4xl md:text-5xl font-serif text-foreground font-semibold">
          Make a Reservation
        </h3>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto text-sm md:text-base">
          Reserve your spot for an unforgettable dining experience.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-linear-to-br max-w-2xl mx-auto from-card/80 to-card/60 backdrop-blur-md border border-border/30 rounded-2xl shadow-2xl p-8 relative z-10 hover:shadow-2xl transition-all duration-500"
      >
        {submitted ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-linear-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="text-green-600 w-8 h-8" />
            </div>
            <h4 className="text-2xl font-serif text-foreground mb-2">
              Reservation Confirmed!
            </h4>
            <p className="text-muted-foreground">
              We'll send you a confirmation email shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <Input
                placeholder="Full Name"
                required
                value={reservation.name}
                onChange={(e) =>
                  setReservation({ ...reservation, name: e.target.value })
                }
                className="rounded-xl bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
              />
              <Input
                placeholder="Email (optional)"
                type="email"
                value={reservation.email}
                onChange={(e) =>
                  setReservation({ ...reservation, email: e.target.value })
                }
                className="rounded-xl bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <Input
                placeholder="Phone"
                required
                value={reservation.phone}
                onChange={(e) =>
                  setReservation({ ...reservation, phone: e.target.value })
                }
                className="rounded-xl bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
              />
              <Input
                placeholder="Number of Guests"
                required
                value={reservation.guests}
                onChange={(e) =>
                  setReservation({ ...reservation, guests: e.target.value })
                }
                className="rounded-xl bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <Input
                type="date"
                required
                value={reservation.date}
                onChange={(e) =>
                  setReservation({ ...reservation, date: e.target.value })
                }
                className="rounded-xl bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
              />
              <Input
                type="time"
                required
                value={reservation.time}
                onChange={(e) =>
                  setReservation({ ...reservation, time: e.target.value })
                }
                className="rounded-xl bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
              />
            </div>
            <Textarea
              placeholder="Special requests (optional)"
              rows={3}
              value={reservation.notes}
              onChange={(e) =>
                setReservation({ ...reservation, notes: e.target.value })
              }
              className="rounded-xl bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
            />
            <Button
              type="submit"
              className="w-full rounded-xl bg-linear-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-medium transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Calendar className="w-5 h-5 mr-2" /> Confirm Reservation
            </Button>
          </form>
        )}
      </motion.div>
    </section>
  );
};
// =========================
// Main Component
// =========================
const WilmaRestaurant = () => {
  const [scrolled, setScrolled] = useState(false);
  const { items, fetchItems, items_loading } = useItem();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const { fetchCategories, getCategoryInfo, categories_loading } =
    useCategory();

  const carouselImages = [
    {
      src: "https://i.pinimg.com/1200x/29/fb/21/29fb2117c66ff0ee0f64a1b496c56615.jpg",
      title: "AMBIANCE",
      description: "Experience luxury dining",
    },
    {
      src: "https://i.pinimg.com/1200x/85/5b/86/855b861e124ff5556b1f9203f20d52a1.jpg",
      title: "INTERIOR",
      description: "Elegant atmosphere",
    },
    {
      src: "https://i.pinimg.com/1200x/3f/67/39/3f6739c5a54ce6998f76a87de6ca2ee4.jpg",
      title: "DINING",
      description: "Premium experience",
    },
  ];

  useEffect(() => {
    const getItems = async () => {
      await fetchItems();
    };
    const getCategories = async () => {
      await fetchCategories();
    };
    getItems();
    getCategories();
  }, [fetchCategories, fetchItems]);

  const popularItems = useMemo(
    () => items.filter((item) => item.is_featured),
    [items]
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className=" w-full bg-background text-foreground ">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/80 backdrop-blur-md shadow-lg border-b"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="shrink-0"
            >
              <h1 className="text-2xl sm:text-3xl font-serif text-primary">
                Wilma
              </h1>
              <p className="text-xs tracking-widest text-muted-foreground">
                RESTAURANT
              </p>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {["Home", "About", "Our Menus", "Reservation", "Contact"].map(
                (item, idx) => (
                  <motion.a
                    key={item}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.06 }}
                    href={`#${item.toLowerCase().replace(/\s+/g, "")}`}
                    className={`${
                      scrolled ? "text-foreground" : "text-white"
                    } transition-colors duration-300 text-sm lg:text-base hover:text-primary relative group`}
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                  </motion.a>
                )
              )}
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center gap-2 sm:gap-4">
              <Cart />

              <div className="hidden md:flex items-center space-x-2">
                <Button variant="ghost" size="icon" asChild>
                  <a href="#">
                    <Facebook className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href="#">
                    <Instagram className="h-5 w-5" />
                  </a>
                </Button>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "light" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>

              {/* Mobile Menu Drawer */}
              <Drawer direction="top">
                <DrawerTrigger asChild className="md:hidden ">
                  <Menu size={18} />
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle className="text-2xl font-serif text-primary">
                      Wilma
                    </DrawerTitle>
                    <DrawerDescription className="text-xs tracking-widest">
                      RESTAURANT
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="px-4 pb-8 space-y-2">
                    {[
                      "Home",
                      "About",
                      "Our Menus",
                      "Reservation",
                      "Contact",
                    ].map((item) => (
                      <DrawerClose asChild key={item}>
                        <a
                          href={`#${item.toLowerCase().replace(/\s+/g, "")}`}
                          className="block py-3 px-4 text-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                        >
                          {item}
                        </a>
                      </DrawerClose>
                    ))}
                    <div className="flex items-center justify-center space-x-4 pt-4">
                      <Button variant="outline" size="icon" asChild>
                        <a href="#">
                          <Facebook className="h-5 w-5" />
                        </a>
                      </Button>
                      <Button variant="outline" size="icon" asChild>
                        <a href="#">
                          <Instagram className="h-5 w-5" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src="/images/main_section_background2.jpg"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/30 to-black/50" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center z-10 px-4"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Badge variant="outline" className="mb-4 text-white border-white">
              More Flavor For Less
            </Badge>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-7xl  font-serif text-white mb-6"
          >
            Taste The
            <br />
            Difference
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-gray-200 max-w-2xl mx-auto mb-8 text-sm sm:text-base px-4"
          >
            When the going gets tough, the tough get grilling. Bringing heat to
            your meat. No one can compete with our meat
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Button size="lg" onClick={() => navigate("/menu")}>
              Our Menus
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 sm:py-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="overflow-hidden border-0 rounded-xl ">
              <Carousel
                className="w-full"
                opts={{
                  align: "start",
                }}
              >
                <CarouselContent>
                  {carouselImages.map((image, index) => (
                    <CarouselItem key={index} className="pt-1 md:basis-3/4">
                      <div className="relative h-[300px] sm:h-[500px] rounded-xl ">
                        <img
                          src={image.src}
                          alt={image.title}
                          className="w-full h-full object-cover shadow-md rounded-xl"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 rounded-xl via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 backdrop-blur-sm p-2 ps-6 text-white rounded-b-xl">
                          <p className="text-lg tracking-widest">
                            {image.title}
                          </p>
                          <p className="text-sm opacity-80">
                            {image.description}
                          </p>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </Carousel>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4 sm:space-y-6"
          >
            <Badge variant="default">Your Special Occasion Destination</Badge>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif text-foreground leading-tight">
              The Wilma is a premium taste that yearns to be{" "}
              <span className="text-primary italic">savored</span>, ground beef
              between your <span className="italic">teeth</span>
            </h3>
          </motion.div>
        </div>
      </section>

      {/* Popular Dishes */}
      <section
        id="ourmenus"
        className="py-12 sm:py-20 px-4 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-linear-to-b from-muted/20 via-background/50 to-secondary/30" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <Badge variant="outline" className="mb-4">
              Customer Favorites
            </Badge>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif text-foreground mb-4">
              Popular Dishes
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
              Discover our most loved dishes, carefully crafted by our expert
              chefs
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12"
          >
            {items_loading || categories_loading ? (
              <>
                {[1, 2, 3, 4].map((i) => (
                  <PopularDishSkeleton key={i} />
                ))}
              </>
            ) : (
              popularItems.map((item) => (
                <motion.div key={item.id} variants={fadeInUp}>
                  <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer group">
                    <div className="relative h-48 sm:h-56 overflow-hidden">
                      <img
                        src={
                          handleImageSrc(item.main_image ?? "") ??
                          "/images/item_image_placeholder.jpg"
                        }
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      {item.rating && (
                        <Badge className="absolute top-4 right-4 bg-primary">
                          <Star
                            size={12}
                            fill="currentColor"
                            className="mr-1"
                          />
                          {item.rating}
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex justify-between items-start mb-2">
                        <CardTitle className="text-base sm:text-lg font-serif">
                          {item.name}
                        </CardTitle>
                        <span className="text-primary font-semibold text-sm sm:text-base">
                          ${item.sale_price ?? item.price}
                        </span>
                      </div>
                      <CardDescription className="text-xs sm:text-sm mb-4 line-clamp-2">
                        {item.description}
                      </CardDescription>
                      <Badge variant="secondary" className="text-xs">
                        {getCategoryInfo(item.category_id ?? "").name}
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Button size="lg" onClick={() => navigate("/menu")}>
              View Full Menu
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Chef Recommend */}
      <section className="py-12 sm:py-20 px-4 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-background via-secondary/10 to-primary/5" />
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 sm:gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4 sm:space-y-6 order-2 md:order-1"
          >
            <Badge variant="outline">Delight In Every Bite</Badge>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif text-foreground">
              Our Chef
              <br />
              Recommend
            </h3>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              Exercitation photo booth stumptown tote bag Banksy, elit small
              batch freegan sed. Craft beer elit seitan exercitation
            </p>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/menu")}
            >
              View Menus
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 md:order-2"
          >
            <div className="overflow-hidden border-0  rounded-xl">
              <div className="h-64 sm:h-96 relative overflow-hidden group rounded-xl">
                <img
                  src="/images/recommended_chef_plate.jpg"
                  className="object-center w-full h-full object-cover shadow-2xl rounded-xl transition-transform duration-700 group-hover:scale-110"
                  alt="Chef's recommendation"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Reservation Section */}
      <ReservationSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <footer className="relative py-8 sm:py-12 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-secondary/60 to-accent/20" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-serif text-primary mb-2">
              Wilma
            </h2>
            <p className="text-xs tracking-widest text-muted-foreground mb-6">
              RESTAURANT
            </p>
            <div className="flex justify-center space-x-4 mb-6">
              <Button variant="ghost" size="icon" asChild>
                <a href="#">
                  <Facebook className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="#">
                  <Instagram className="h-5 w-5" />
                </a>
              </Button>
            </div>
            <p className="text-muted-foreground text-xs sm:text-sm">
              © 2024 Wilma Restaurant. All rights reserved.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default WilmaRestaurant;
