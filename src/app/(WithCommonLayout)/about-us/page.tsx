"use client";

import { Card, Avatar } from "@nextui-org/react";

const AboutUs = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-10 px-4">
      <h1 className="text-4xl font-bold dark:text-white mb-10">About Us</h1>

      {/* Project Overview Section */}
      <div className="max-w-4xl w-full bg-green-500 p-8 rounded-lg shadow-lg mb-12">
        <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
        <p className="leading-relaxed">
          The <strong>Gardening Tips & Advice Platform</strong> is a
          comprehensive full-stack web application designed for gardening
          enthusiasts and professionals to share, discover, and engage with
          gardening knowledge. It provides users with insightful tips, plant
          care advice, seasonal guides, and techniques to enhance their
          gardening experiences.
        </p>
        <p className="leading-relaxed mt-4">
          Additionally, users can share their gardening knowledge, interact with
          others, and explore premium content through a seamless payment
          integration. Our mission is to foster a community where everyone, from
          beginners to expert gardeners, can learn, share, and grow together.
        </p>
      </div>

      {/* Mission and Vision Section */}
      <div className="max-w-4xl w-full bg-green-500 p-8 rounded-lg shadow-lg mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="leading-relaxed">
          Our mission is to create an inclusive platform that promotes
          sustainable gardening practices and empowers individuals to cultivate
          their own green spaces. We aim to provide practical, reliable, and
          easily accessible gardening tips and advice to people of all levels of
          expertise.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Vision</h2>
        <p className="leading-relaxed">
          We envision a world where everyone has the knowledge and confidence to
          grow their own gardens, contributing to a greener, more sustainable
          future. By fostering a community of passionate gardeners, we strive to
          make gardening accessible, enjoyable, and beneficial for all.
        </p>
      </div>

      {/* Team Section */}
      <div className="max-w-4xl w-full bg-green-500 p-8 rounded-lg shadow-lg mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Example team members */}
          <TeamMember
            name="Shah Jalal"
            role="Founder & Lead Developer"
            image="https://avatars.githubusercontent.com/u/79104097"
            description="Shah Jalal is passionate about gardening and technology. With over a decade of experience in web development, he leads the platform's development and ensures it serves the gardening community effectively."
          />
          <TeamMember
            name="Jamal Uddin"
            role="Community Manager"
            image="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?t=st=1724812632~exp=1724816232~hmac=75f98741f279e256c06e18058ffddaaa8d1afb4ab7e6f63e8df94c6b8b92c35d&w=740"
            description="Jamal is dedicated to engaging with the gardening community, fostering a collaborative environment where users can share knowledge and grow together."
          />
          <TeamMember
            name="Rashed Khan"
            role="Community Manager"
            image="https://img.freepik.com/free-photo/handsome-bearded-guy-posing-against-white-wall_273609-20597.jpg?t=st=1724812764~exp=1724816364~hmac=7f4127abebc488a6e953d30aeab9a67be453ef1ba78450efb9b093f1d465df69&w=740"
            description="Rashed is dedicated to engaging with the gardening community, fostering a collaborative environment where users can share knowledge and grow together."
          />
          <TeamMember
            name="Muntasir Hasan"
            role="Community Manager"
            image="https://img.freepik.com/premium-photo/20s-man-with-emotion-gesture-product-presentation-introduction_1000823-244194.jpg?w=826"
            description="Muntasir is dedicated to engaging with the gardening community, fostering a collaborative environment where users can share knowledge and grow together."
          />
        </div>
      </div>
    </div>
  );
};

// Team Member Component
interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  description: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({
  name,
  role,
  image,
  description,
}) => (
  <Card className="flex flex-col items-center p-6 shadow-md">
    <Avatar src={image} alt={name} size="md" className="mb-4" />
    <h4>{name}</h4>
    <small className="text-gray-600">{role}</small>
    <p className="text-center text-gray-600 mt-2">{description}</p>
  </Card>
);

export default AboutUs;
