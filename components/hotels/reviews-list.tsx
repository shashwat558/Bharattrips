"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Star, ThumbsUp, MessageCircle, User2Icon, ThumbsDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { addReview, getPropertyReviews, likeReview } from '@/lib/actions/host'
import { useAuth } from '@/stores/useAuth'

interface ReviewsListProps {
  hotelId: string
  rating: number
  reviewCount: number
}

interface Reviews {
  id: string,
  user_id: string,
  property_id: string,
  comment: string,
  review_title: string,
  rating: number,
  created_at: Date,
  
  name: string,
  email: string,
  likes: number,
  dislikes: number
  
}

// This would typically come from an API
const reviews = [
  {
    id: 1,
    user: {
      name: "Sarah Johnson",
      location: "New York, USA",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
    },
    rating: 5,
    date: "August 15, 2023",
    title: "Exceptional luxury and service",
    comment: "Our stay at Grand Plaza was absolutely perfect. The staff went above and beyond to make our anniversary special. The room had a stunning view and the amenities were top-notch. The spa treatments were divine and the restaurant served some of the best food we've had in Paris. Will definitely return!",
    likes: 12,
    replies: 2
  },
  {
    id: 2,
    user: {
      name: "Michael Chen",
      location: "Toronto, Canada",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
    },
    rating: 4,
    date: "July 22, 2023",
    title: "Great location, minor service issues",
    comment: "The hotel is in a prime location with beautiful views. Our room was spacious and well-appointed. The only issues we encountered were some delays with room service and housekeeping. The concierge was very helpful with restaurant recommendations and arranging transportation. Would recommend overall.",
    likes: 8,
    replies: 1
  },
  {
    id: 3,
    user: {
      name: "Emma Williams",
      location: "London, UK",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"
    },
    rating: 5,
    date: "June 5, 2023",
    title: "A truly luxurious experience",
    comment: "From the moment we arrived, we were treated like royalty. The staff remembered our names and preferences throughout our stay. The room was immaculate with breathtaking views of the Eiffel Tower. The beds were incredibly comfortable, and the bathroom was spacious with high-end toiletries. The hotel restaurant deserves its Michelin star - every meal was exceptional. Can't wait to return!",
    likes: 15,
    replies: 0
  },
  {
    id: 4,
    user: {
      name: "David Rodriguez",
      location: "Madrid, Spain",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg"
    },
    rating: 3,
    date: "May 12, 2023",
    title: "Beautiful property but overpriced",
    comment: "The hotel itself is gorgeous and well-maintained. However, I found it to be overpriced for what you get. The rooms, while nice, aren't exceptional for the premium price point. The staff was professional but somewhat distant. The location is excellent for sightseeing. Breakfast was good but again, very expensive for what was offered.",
    likes: 5,
    replies: 3
  }
];
// interface reviewsType {
//   id: string,
//   user: {
//     name: string,
//     loction: string,
//     images
//   }
// }
// Calculate rating distribution
const ratingDistribution = [
  { stars: 5, percentage: 65 },
  { stars: 4, percentage: 20 },
  { stars: 3, percentage: 10 },
  { stars: 2, percentage: 3 },
  { stars: 1, percentage: 2 }
];

const ReviewsList = ({ hotelId, rating, reviewCount }: ReviewsListProps) => {
  const [sortBy, setSortBy] = useState("recent");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [reviews, setReviews] = useState<Reviews[] | []>([]);
  const {user} = useAuth();
  // const [reviews, setReviews] = useState([]);

 useEffect(() => {
    const getReviews = async () => {
      const reviews = await getPropertyReviews(hotelId);
      console.log(reviews);
      setReviews(reviews)
      

      
    }
    getReviews()
  },[hotelId])

  
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Rating Overview */}
        <div className="w-full md:w-1/3 bg-card rounded-lg border p-6">
          <h3 className="font-playfair text-xl font-bold mb-4">Guest Rating</h3>
          <div className="flex items-center gap-4 mb-6">
            <div className="text-4xl font-bold">{rating}</div>
            <div>
              <div className="flex mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-5 w-5",
                      i < Math.round(rating) ? "text-accent fill-accent" : "text-muted"
                    )}
                  />
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                Based on {reviewCount} reviews
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            {ratingDistribution.map((item) => (
              <div key={item.stars} className="flex items-center gap-3">
                <div className="w-12 text-sm">{item.stars} stars</div>
                <Progress value={item.percentage} className="h-2" />
                <div className="w-8 text-sm text-right">{item.percentage}%</div>
              </div>
            ))}
          </div>
          
          <Button className="w-full mt-6" onClick={() => setShowReviewForm((prev) => !prev)}>
            {showReviewForm ? "Cancel" : "Write a Review"}
          </Button>

          {showReviewForm && (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const newReview = await addReview({comment: newComment, propertyId: hotelId, rating: newRating, reviewTitle: newTitle})
              console.log({ newRating, newTitle, newComment });

              if (
                newReview &&
                typeof newReview === "object" &&
                "id" in newReview &&
                "user_id" in newReview &&
                "property_id" in newReview
              ) {
                setReviews((prev) => [...prev, newReview]);
              }
              
              

              
              
              setShowReviewForm(false);
              setNewRating(0);
              setNewTitle("");
              setNewComment("");
            }}
            className="mt-6 space-y-4"
          >
            <div>
              <label className="block mb-1 font-medium">Your Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    onClick={() => setNewRating(star)}
                    className={cn(
                      "h-6 w-6 cursor-pointer",
                      newRating >= star ? "text-accent fill-accent" : "text-muted"
                    )}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium">Title</label>
              <input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Great stay!"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Your Review</label>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={4}
                className="w-full p-2 border rounded-md"
                placeholder="Share your experience..."
              />
            </div>

            <Button type="submit" className="w-full">
              Submit Review
            </Button>
          </form>
)}

        </div>
        
        

        {/* Reviews List */}
        <div className="w-full md:w-2/3">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-playfair text-xl font-bold">Guest Reviews</h3>
            <select 
              className="p-2 rounded-md border text-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="recent">Most Recent</option>
              <option value="highest">Highest Rating</option>
              <option value="lowest">Lowest Rating</option>
            </select>
          </div>
          
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-6 last:border-none">
                <div className="flex items-start gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <User2Icon className='w-5 h-5'/>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-wrap justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">{review.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {new Date(review.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "h-4 w-4",
                              i < review.rating ? "text-accent fill-accent" : "text-muted"
                            )}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <h5 className="font-medium mb-2">{review.review_title}</h5>
                    <p className="text-muted-foreground mb-4">{review.comment}</p>
                    
                    <div className="flex gap-4">
                        <Button
                          onClick={async () => {
                            await likeReview({ propertyId: hotelId, reviewId: review.id, voteType: "like" });

                            setReviews((prev) =>
                              prev.map((r) =>
                                r.id === review.id
                                  ? { ...r, likes: (r.likes || 0) + 1 } 
                                  : r
                              )
                            );
                          }}
                          variant="ghost"
                          size="sm"
                          className="h-8 gap-1"
                        >
                          <ThumbsUp className="h-4 w-4" />
                          <span>{review.likes > 0 ? review.likes : ""}</span>
                        </Button>
                        <Button onClick={async () => {
                          await likeReview({propertyId: hotelId, reviewId: review.id, voteType: "dislike"}) 
                          setReviews((prev) =>
                              prev.map((r) =>
                                r.id === review.id
                                  ? { ...r, likes: (r.likes || 0) + 1 } 
                                  : r
                              )
                            );
                          }
                          } variant="ghost" size="sm" className="h-8 gap-1">
                          <ThumbsDown className="h-4 w-4" />
                          <span>{review.dislikes === 0 ? "" : review.dislikes}</span>
                        </Button>
                      
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <Button variant="outline" className="w-full mt-6">
            Load More Reviews
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ReviewsList