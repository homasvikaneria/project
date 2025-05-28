import React, { useState } from 'react';
import"./Blog.css"
import Mainnavbar from '../Mainnav/Mainnavbar';
const BlogSection = () => {
  const blogPosts = [
    {
      title: "5 Tips for First-Time Homebuyers",
      excerpt: "Buying a home for the first time can be overwhelming. Here are 5 essential tips to make your home-buying journey smooth and successful. From getting pre-approved to knowing your budget, these tips will help you navigate the process with confidence.",
      date: "February 20, 2025",
      link: "/blog/tips-for-first-time-homebuyers",
      image: "https://via.placeholder.com/400x250?text=Homebuyer+Tips"  // Placeholder image
    },
    {
      title: "How to Stage Your Home for a Quick Sale",
      excerpt: "Staging your home is a crucial step to attract buyers. Here are some tips on how to stage your home effectively and get it sold faster. Learn how to enhance curb appeal, declutter, and choose the right colors for each room.",
      date: "February 18, 2025",
      link: "/blog/how-to-stage-your-home",
      image: "https://via.placeholder.com/400x250?text=Home+Staging"  // Placeholder image
    },
    {
      title: "The Best Neighborhoods to Invest in Real Estate",
      excerpt: "Investing in real estate can be profitable if you know where to look. Discover some of the best neighborhoods for real estate investments, including those with high rental yields, growing property values, and vibrant community amenities.",
      date: "February 15, 2025",
      link: "/blog/best-neighborhoods-for-real-estate-investment",
      image: "https://via.placeholder.com/400x250?text=Neighborhood+Investments"  // Placeholder image
    },
    {
      title: "Understanding Market Trends for 2025",
      excerpt: "The real estate market is constantly changing. Learn about the trends that will shape the market in 2025 and how to make informed investment decisions. Topics include rising interest rates, changes in demand for remote workspaces, and more.",
      date: "February 10, 2025",
      link: "/blog/understanding-market-trends-2025",
      image: "https://via.placeholder.com/400x250?text=Market+Trends"  // Placeholder image
    },
    {
      title: "How to Finance Your First Home Purchase",
      excerpt: "Financing your first home is an exciting and crucial step. We break down the best loan options and strategies to help you secure your first mortgage. Understand the difference between fixed-rate and adjustable-rate mortgages, down payments, and more.",
      date: "February 8, 2025",
      link: "/blog/how-to-finance-your-first-home",
      image: "https://via.placeholder.com/400x250?text=Mortgage+Financing"  // Placeholder image
    },
    {
      title: "What to Look for in a Real Estate Agent",
      excerpt: "Choosing the right real estate agent can make or break your experience. Here’s what you need to know before hiring an agent for your home purchase or sale. Learn about their experience, track record, and local knowledge.",
      date: "February 5, 2025",
      link: "/blog/what-to-look-for-in-real-estate-agent",
      image: "https://via.placeholder.com/400x250?text=Real+Estate+Agent"  // Placeholder image
    },
    {
      title: "How to Negotiate the Best Deal in Real Estate",
      excerpt: "Negotiating the best deal in real estate requires knowledge and strategy. Learn how to effectively negotiate with sellers, understand your market value, and make offers that align with your goals. Discover key tactics for saving money in the long run.",
      date: "February 3, 2025",
      link: "/blog/how-to-negotiate-the-best-deal",
      image: "https://via.placeholder.com/400x250?text=Negotiation+Tips"  // Placeholder image
    },
    {
      title: "The Importance of Home Inspections",
      excerpt: "A home inspection is one of the most important steps in buying a property. This article explains why home inspections are necessary and what they can uncover. We also share tips on how to choose a reputable home inspector.",
      date: "January 30, 2025",
      link: "/blog/importance-of-home-inspections",
      image: "https://via.placeholder.com/400x250?text=Home+Inspection"  // Placeholder image
    },
    {
      title: "Is Now the Right Time to Sell Your Home?",
      excerpt: "Whether you're considering selling your home for the first time or have done it before, timing is everything. Find out how to determine if now is the right time to sell based on the market, your home’s condition, and your personal goals.",
      date: "January 28, 2025",
      link: "/blog/is-now-the-right-time-to-sell",
      image: "https://via.placeholder.com/400x250?text=Selling+Home"  // Placeholder image
    },
    {
      title: "The Future of Smart Homes",
      excerpt: "Smart home technology is transforming how we live. Explore the future of smart homes, including the latest advancements in automation, security, energy efficiency, and more. Learn how these technologies can add value to your property.",
      date: "January 25, 2025",
      link: "/blog/future-of-smart-homes",
      image: "https://via.placeholder.com/400x250?text=Smart+Homes"  // Placeholder image
    }
  ];

  // FAQ data (array of questions and answers)
  const faqData = [
    {
      question: "What is the process of buying a home?",
      answer: "The process of buying a home typically involves getting pre-approved for a mortgage, finding a real estate agent, searching for properties, making an offer, getting the home inspected, and closing the deal."
    },
    {
      question: "How do I get pre-approved for a mortgage?",
      answer: "To get pre-approved for a mortgage, you need to submit an application to a lender, who will review your credit score, income, debts, and assets to determine how much you can borrow."
    },
    {
      question: "What is staging a home, and why is it important?",
      answer: "Staging a home involves decorating and arranging the furniture in a way that makes the space look appealing to potential buyers. It's important because it helps buyers visualize the property as their own."
    }
  ];

  // FAQ visibility state
  const [faqVisible, setFaqVisible] = useState({});

  // Toggle FAQ visibility for each question
  const toggleFAQ = (index) => {
    setFaqVisible((prevState) => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  return (

    <section className="blog-section">
        <Mainnavbar/>
      <div className="container">
        <h2 className="section-title">Latest Blog Posts</h2>
        <div className="blog-posts">
          {blogPosts.map((post, index) => (
            <div className="blog-post" key={index}>
              <img src={post.image} alt={post.title} className="post-image" />
              <h3 className="post-title">{post.title}</h3>
              <p className="post-excerpt">{post.excerpt}</p>
              <span className="post-date">{post.date}</span>
              <a href={post.link} className="read-more">Read More</a>
            </div>
          ))}
        </div>

        <div className="faq-section">
          <h3 className="faq-title">Frequently Asked Questions</h3>

          {faqData.map((faq, index) => (
            <div className="faq-item" key={index}>
              <h4 className="faq-question" onClick={() => toggleFAQ(index)}>
                {faq.question}
                <span className="faq-toggle-icon">
                  {faqVisible[index] ? '▲' : '▼'}
                </span>
              </h4>
              {faqVisible[index] && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
