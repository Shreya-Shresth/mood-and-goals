import { useState } from 'react';
import { CheckCircle, Heart, ImageIcon, BookOpen, Watch, Plus, Trash2, TrendingUp, Users, Target, Zap, Star, ArrowRight, Upload, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

interface Goal {
  id: string;
  text: string;
  completed: boolean;
  addedAt: Date;
}

const Index = () => {
  // Bucket List State
  const [goals, setGoals] = useState<Goal[]>([
    { id: '1', text: 'Learn a new language', completed: false, addedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) }, // 5 days ago
    { id: '2', text: 'Travel to Japan', completed: false, addedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000) }, // 10 days ago
    { id: '3', text: 'Run a marathon', completed: true, addedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000) }, // 20 days ago
    { id: '4', text: 'Write a book', completed: false, addedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) } // 2 days ago
  ]);
  const [newGoal, setNewGoal] = useState('');

  // Mood Tracker State
  const [currentMood, setCurrentMood] = useState('');
  const moods = [
    { emoji: '😊', label: 'Happy', color: 'bg-yellow-400', theme: 'from-yellow-50 via-orange-50 to-yellow-100' },
    { emoji: '😌', label: 'Calm', color: 'bg-blue-400', theme: 'from-blue-50 via-cyan-50 to-blue-100' },
    { emoji: '💪', label: 'Motivated', color: 'bg-green-400', theme: 'from-green-50 via-emerald-50 to-green-100' },
    { emoji: '😴', label: 'Tired', color: 'bg-purple-400', theme: 'from-purple-50 via-indigo-50 to-purple-100' },
    { emoji: '😔', label: 'Sad', color: 'bg-gray-400', theme: 'from-gray-50 via-slate-50 to-gray-100' }
  ];

  // Image Slider State
  const [currentImage, setCurrentImage] = useState(0);
  const [images, setImages] = useState([
    {
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
      caption: 'Find your inner peace'
    },
    {
      url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e',
      caption: 'Adventure awaits'
    },
    {
      url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
      caption: 'Nature heals the soul'
    }
  ]);

  // Smart Watch Products State
  const watchItems = [
    { 
      name: 'Apple Watch Ultra', 
      price: '$799', 
      image: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9',
      features: 'GPS, Cellular, Health Monitoring'
    },
    { 
      name: 'Samsung Galaxy Watch', 
      price: '$329', 
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      features: 'Sleep Tracking, ECG, Water Resistant'
    },
    { 
      name: 'Garmin Forerunner', 
      price: '$449', 
      image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1',
      features: 'Running Dynamics, GPS, Long Battery'
    }
  ];

  // Get time since added
  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays <= 7) return `${diffDays} days ago`;
    if (diffDays <= 30) return `${Math.ceil(diffDays / 7)} week${Math.ceil(diffDays / 7) > 1 ? 's' : ''} ago`;
    return `${Math.ceil(diffDays / 30)} month${Math.ceil(diffDays / 30) > 1 ? 's' : ''} ago`;
  };

  // Get current mood theme
  const getCurrentTheme = () => {
    const mood = moods.find(m => m.label === currentMood);
    return mood ? mood.theme : 'from-slate-50 via-blue-50 to-indigo-100';
  };

  // Stats data
  const stats = [
    { label: 'Goals Completed', value: '12', icon: Target, color: 'bg-blue-500', change: '+15%' },
    { label: 'Days Active', value: '28', icon: TrendingUp, color: 'bg-green-500', change: '+23%' },
    { label: 'Mood Score', value: '4.2', icon: Heart, color: 'bg-purple-500', change: '+8%' },
    { label: 'Wellness Points', value: '847', icon: Star, color: 'bg-orange-500', change: '+12%' }
  ];

  // Add Goal Function
  const addGoal = () => {
    if (newGoal.trim()) {
      const goal: Goal = {
        id: Date.now().toString(),
        text: newGoal.trim(),
        completed: false,
        addedAt: new Date()
      };
      setGoals([...goals, goal]);
      setNewGoal('');
      toast({
        title: "Goal Added!",
        description: "Your new goal has been added to your bucket list.",
      });
    }
  };

  // Toggle Goal Completion
  const toggleGoal = (id: string) => {
    setGoals(goals.map(goal => 
      goal.id === id 
        ? { ...goal, completed: !goal.completed }
        : goal
    ));
    const goal = goals.find(g => g.id === id);
    if (goal) {
      toast({
        title: goal.completed ? "Goal Reopened!" : "Goal Completed!",
        description: goal.completed ? "Goal moved back to active list." : "Congratulations on completing your goal!",
      });
    }
  };

  // Remove Goal Function
  const removeGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id));
    toast({
      title: "Goal Removed!",
      description: "Goal has been removed from your bucket list.",
    });
  };

  // Select Mood Function
  const selectMood = (mood: any) => {
    setCurrentMood(mood.label);
    toast({
      title: "Mood Logged!",
      description: `You're feeling ${mood.label.toLowerCase()} today.`,
    });
  };

  // Next Image Function
  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  // Previous Image Function
  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  // Add Image Function
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImage = {
          url: e.target?.result as string,
          caption: 'My favorite moment'
        };
        setImages([...images, newImage]);
        toast({
          title: "Image Added!",
          description: "Your image has been added to the gallery.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getCurrentTheme()}`}>
      {/* Enhanced Header */}
      <header className="bg-white/90 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  LifeSync
                </h1>
                <p className="text-sm text-gray-500">Personal Wellness Hub</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800 px-3 py-1">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                {currentMood || 'Set your mood'}
              </Badge>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl mx-8"></div>
        <div className="max-w-5xl mx-auto relative">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-medium mb-6">
            <Zap className="w-4 h-4 mr-2" />
            Elevate Your Productivity & Wellness
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Empower Your
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              Personal Journey
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Your all-in-one dashboard for mastering goals, moods, creativity, and shopping—seamlessly. Elevate your wellness journey with stunning analytics and interactive tools that keep you inspired.
          </p>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mb-3 mx-auto`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600 mb-2">{stat.label}</div>
                <div className="text-xs text-green-600 font-medium">{stat.change}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Main Dashboard Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Enhanced Bucket List Module with Garden Background */}
          <Card className="lg:col-span-1 hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-white/90 backdrop-blur-sm border-0 shadow-xl overflow-hidden">
            <CardHeader 
              className="text-white rounded-t-2xl relative overflow-hidden h-32"
              style={{
                backgroundImage: `url('/lovable-uploads/5c3907ba-74ad-4bdb-8d8d-7a097f61a018.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
              <CardTitle className="flex items-center justify-between relative z-10">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-6 h-6" />
                  <span className="text-xl font-bold">My Bucket List</span>
                </div>
                <Badge className="bg-white/20 text-white border-0">{goals.length}</Badge>
              </CardTitle>
              <CardDescription className="text-white/90 relative z-10 font-medium">
                Dreams waiting to be achieved
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 bg-gradient-to-b from-green-50 to-emerald-50">
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add a new dream..."
                    value={newGoal}
                    onChange={(e) => setNewGoal(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addGoal()}
                    className="flex-1 border-2 focus:border-green-400 rounded-xl bg-white/80"
                  />
                  <Button onClick={addGoal} size="sm" className="bg-green-600 hover:bg-green-700 rounded-xl px-4">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {goals.map((goal) => (
                    <div key={goal.id} className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 group border-2 ${
                      goal.completed 
                        ? 'bg-green-100/80 border-green-300 opacity-75' 
                        : 'bg-white/60 backdrop-blur-sm border-green-200 hover:bg-white/80'
                    }`}>
                      <div className="flex items-center space-x-3 flex-1">
                        <button
                          onClick={() => toggleGoal(goal.id)}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                            goal.completed 
                              ? 'bg-green-500 border-green-500 text-white' 
                              : 'border-green-400 hover:border-green-500'
                          }`}
                        >
                          {goal.completed && <Check className="w-4 h-4" />}
                        </button>
                        <div className="flex-1">
                          <span className={`text-sm font-medium ${
                            goal.completed 
                              ? 'text-green-700 line-through' 
                              : 'text-green-800'
                          }`}>
                            {goal.text}
                          </span>
                          <div className="text-xs text-green-600 mt-1">
                            {getTimeAgo(goal.addedAt)}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeGoal(goal.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Mood Tracker Module */}
          <Card className="lg:col-span-1 hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-t-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <CardTitle className="flex items-center justify-between relative z-10">
                <div className="flex items-center space-x-2">
                  <Heart className="w-6 h-6" />
                  <span>Mood Tracker</span>
                </div>
                <Badge className="bg-white/20 text-white border-0">Daily</Badge>
              </CardTitle>
              <CardDescription className="text-purple-100 relative z-10">
                How are you feeling today?
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 gap-3">
                {moods.map((mood) => (
                  <button
                    key={mood.label}
                    onClick={() => selectMood(mood)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 transform ${
                      currentMood === mood.label
                        ? `${mood.color} border-gray-800 text-white shadow-lg`
                        : 'border-gray-200 hover:border-purple-300 hover:shadow-md bg-gradient-to-r from-white to-purple-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{mood.emoji}</span>
                      <div className="flex-1 text-left">
                        <span className="font-semibold">{mood.label}</span>
                        {currentMood === mood.label && (
                          <div className="text-sm opacity-90">Current mood</div>
                        )}
                      </div>
                      {currentMood === mood.label && (
                        <CheckCircle className="w-5 h-5" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Image Slider Module with Upload */}
          <Card className="lg:col-span-1 hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-t-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <CardTitle className="flex items-center justify-between relative z-10">
                <div className="flex items-center space-x-2">
                  <ImageIcon className="w-6 h-6" />
                  <span>Inspiration Gallery</span>
                </div>
                <Badge className="bg-white/20 text-white border-0">{currentImage + 1}/{images.length}</Badge>
              </CardTitle>
              <CardDescription className="text-blue-100 relative z-10">
                Daily motivation and beautiful moments
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative group">
                <img
                  src={images[currentImage].url}
                  alt="Inspiration"
                  className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end justify-center p-6">
                  <p className="text-white text-lg font-bold text-center">
                    {images[currentImage].caption}
                  </p>
                </div>
                <div className="absolute top-1/2 left-4 right-4 flex justify-between transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={prevImage}
                    className="bg-white/90 hover:bg-white backdrop-blur-sm rounded-full w-10 h-10 p-0"
                  >
                    ←
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={nextImage}
                    className="bg-white/90 hover:bg-white backdrop-blur-sm rounded-full w-10 h-10 p-0"
                  >
                    →
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-center space-x-2 mb-4">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentImage ? 'bg-blue-500 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    id="image-upload"
                  />
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 rounded-xl">
                    <Upload className="w-4 h-4 mr-2" />
                    Add Your Image
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Magazine View Module */}
          <Card className="lg:col-span-2 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-t-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
              <CardTitle className="flex items-center justify-between relative z-10">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-6 h-6" />
                  <span>Wellness Magazine</span>
                </div>
                <Badge className="bg-white/20 text-white border-0">Featured</Badge>
              </CardTitle>
              <CardDescription className="text-orange-100 relative z-10">
                Latest articles on personal growth and wellness
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <article className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-2xl mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1506126613408-eca07ce68773"
                      alt="Mindfulness"
                      className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-800 group-hover:text-orange-500 transition-colors text-lg mb-2">
                    5 Mindfulness Techniques for Daily Peace
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Discover simple practices to bring mindfulness into your everyday routine and reduce stress naturally.
                  </p>
                  <div className="flex items-center text-xs text-gray-500">
                    <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full mr-2">Wellness</span>
                    <span>5 min read</span>
                  </div>
                </article>
                <article className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-2xl mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b"
                      alt="Productivity"
                      className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-800 group-hover:text-orange-500 transition-colors text-lg mb-2">
                    Building Sustainable Habits That Stick
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Learn the science behind habit formation and discover proven strategies for creating lasting positive changes.
                  </p>
                  <div className="flex items-center text-xs text-gray-500">
                    <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full mr-2">Productivity</span>
                    <span>7 min read</span>
                  </div>
                </article>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Smart Watch Module */}
          <Card className="lg:col-span-1 hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-br from-slate-700 to-gray-800 text-white rounded-t-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <CardTitle className="flex items-center justify-between relative z-10">
                <div className="flex items-center space-x-2">
                  <Watch className="w-6 h-6" />
                  <span>Smart Watches</span>
                </div>
                <Badge className="bg-white/20 text-white border-0">{watchItems.length} devices</Badge>
              </CardTitle>
              <CardDescription className="text-gray-100 relative z-10">
                Cutting-edge wearables for your active lifestyle
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {watchItems.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 border-2 border-gray-100 rounded-2xl hover:border-gray-300 hover:bg-gradient-to-r hover:from-gray-50 hover:to-slate-50 transition-all duration-300 group cursor-pointer">
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-xl group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-slate-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Watch className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 group-hover:text-slate-600 transition-colors">{item.name}</h4>
                      <p className="text-slate-600 font-bold text-lg">{item.price}</p>
                      <p className="text-xs text-gray-500 mt-1">{item.features}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-slate-500 transition-colors" />
                  </div>
                ))}
                <Button className="w-full mt-6 bg-gradient-to-r from-slate-600 to-gray-700 hover:from-slate-700 hover:to-gray-800 rounded-xl py-3 font-semibold">
                  Explore All Watches
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>

        </div>
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">LifeSync</span>
              </div>
              <p className="text-gray-400">
                Your personal hub for goal and mood tracking, empowering a balanced lifestyle.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-2 text-gray-400">
                <p>150+ Active Users</p>
                <p>1,200+ Goals Completed</p>
                <p>95% User Satisfaction</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <p className="text-gray-400 mb-4">
                Join our community of wellness enthusiasts and productivity experts.
              </p>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                Get Started Today
              </Button>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 LifeSync. Empowering your journey to a balanced, productive life.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
