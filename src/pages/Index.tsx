
import { useState } from 'react';
import { CheckCircle, Heart, ImageIcon, BookOpen, ShoppingCart, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  // Bucket List State
  const [goals, setGoals] = useState([
    'Learn a new language',
    'Travel to Japan',
    'Run a marathon',
    'Write a book'
  ]);
  const [newGoal, setNewGoal] = useState('');

  // Mood Tracker State
  const [currentMood, setCurrentMood] = useState('');
  const moods = [
    { emoji: '😊', label: 'Happy', color: 'bg-yellow-400' },
    { emoji: '😌', label: 'Calm', color: 'bg-blue-400' },
    { emoji: '💪', label: 'Motivated', color: 'bg-green-400' },
    { emoji: '😴', label: 'Tired', color: 'bg-purple-400' },
    { emoji: '😔', label: 'Sad', color: 'bg-gray-400' }
  ];

  // Image Slider State
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
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
  ];

  // Shopping State
  const wishlistItems = [
    { name: 'Yoga Mat', price: '$45', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b' },
    { name: 'Essential Oils Set', price: '$89', image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108' },
    { name: 'Journal', price: '$25', image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57' }
  ];

  const addGoal = () => {
    if (newGoal.trim()) {
      setGoals([...goals, newGoal.trim()]);
      setNewGoal('');
      toast({
        title: "Goal Added!",
        description: "Your new goal has been added to your bucket list.",
      });
    }
  };

  const removeGoal = (index: number) => {
    setGoals(goals.filter((_, i) => i !== index));
    toast({
      title: "Goal Completed!",
      description: "Congratulations on completing your goal!",
    });
  };

  const selectMood = (mood: any) => {
    setCurrentMood(mood.label);
    toast({
      title: "Mood Logged!",
      description: `You're feeling ${mood.label.toLowerCase()} today.`,
    });
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                LifeSync
              </h1>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              {currentMood || 'Set your mood'}
            </Badge>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Personal
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Wellness Dashboard
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Track your goals, monitor your mood, explore inspiration, and manage your wellness journey all in one beautiful place.
          </p>
        </div>
      </section>

      {/* Main Dashboard Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Bucket List Module */}
          <Card className="lg:col-span-1 hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>Bucket List</span>
              </CardTitle>
              <CardDescription className="text-green-100">
                Track your life goals and dreams
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add a new goal..."
                    value={newGoal}
                    onChange={(e) => setNewGoal(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addGoal()}
                    className="flex-1"
                  />
                  <Button onClick={addGoal} size="sm" className="bg-green-500 hover:bg-green-600">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {goals.map((goal, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <span className="text-sm">{goal}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeGoal(index)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mood Tracker Module */}
          <Card className="lg:col-span-1 hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center space-x-2">
                <Heart className="w-5 h-5" />
                <span>Mood Tracker</span>
              </CardTitle>
              <CardDescription className="text-purple-100">
                How are you feeling today?
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 gap-3">
                {moods.map((mood) => (
                  <button
                    key={mood.label}
                    onClick={() => selectMood(mood)}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                      currentMood === mood.label
                        ? `${mood.color} border-gray-800 text-white`
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{mood.emoji}</span>
                      <span className="font-medium">{mood.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Image Slider Module */}
          <Card className="lg:col-span-1 hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center space-x-2">
                <ImageIcon className="w-5 h-5" />
                <span>Inspiration Gallery</span>
              </CardTitle>
              <CardDescription className="text-blue-100">
                Daily motivation and beautiful moments
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={images[currentImage].url}
                  alt="Inspiration"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <p className="text-white text-lg font-semibold text-center px-4">
                    {images[currentImage].caption}
                  </p>
                </div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={prevImage}
                    className="bg-white/80 hover:bg-white"
                  >
                    ←
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={nextImage}
                    className="bg-white/80 hover:bg-white"
                  >
                    →
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-center space-x-1">
                  {images.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImage ? 'bg-blue-500' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Magazine View Module */}
          <Card className="lg:col-span-2 hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5" />
                <span>Wellness Magazine</span>
              </CardTitle>
              <CardDescription className="text-orange-100">
                Latest articles on personal growth and wellness
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <article className="group cursor-pointer">
                  <img
                    src="https://images.unsplash.com/photo-1506126613408-eca07ce68773"
                    alt="Mindfulness"
                    className="w-full h-32 object-cover rounded-lg mb-3 group-hover:scale-105 transition-transform duration-200"
                  />
                  <h3 className="font-semibold text-gray-800 group-hover:text-orange-500 transition-colors">
                    5 Mindfulness Techniques for Daily Peace
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Discover simple practices to bring mindfulness into your everyday routine...
                  </p>
                </article>
                <article className="group cursor-pointer">
                  <img
                    src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b"
                    alt="Productivity"
                    className="w-full h-32 object-cover rounded-lg mb-3 group-hover:scale-105 transition-transform duration-200"
                  />
                  <h3 className="font-semibold text-gray-800 group-hover:text-orange-500 transition-colors">
                    Building Sustainable Habits That Stick
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Learn the science behind habit formation and how to make lasting changes...
                  </p>
                </article>
              </div>
            </CardContent>
          </Card>

          {/* Shopping/Wishlist Module */}
          <Card className="lg:col-span-1 hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center space-x-2">
                <ShoppingCart className="w-5 h-5" />
                <span>Wellness Wishlist</span>
              </CardTitle>
              <CardDescription className="text-emerald-100">
                Products for your wellness journey
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {wishlistItems.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <p className="text-emerald-600 font-semibold text-sm">{item.price}</p>
                    </div>
                  </div>
                ))}
                <Button className="w-full mt-4 bg-emerald-500 hover:bg-emerald-600">
                  View All Items
                </Button>
              </div>
            </CardContent>
          </Card>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600">
            LifeSync - Your journey to a balanced, productive life starts here.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
