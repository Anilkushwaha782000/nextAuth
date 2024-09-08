"use client"
import React from 'react'
function About() {
    return (
        <div>
            <section className="py-16 px-4 md:px-10 lg:px-20">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Key Features</h2>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {[
                        {
                            title: 'Real-Time Collaboration',
                            description:
                                'Work together seamlessly with live updates and instant notifications.',
                            icon: '🕒',
                        },
                        {
                            title: 'Task Assignments',
                            description:
                                'Assign tasks to team members and track progress in real-time.',
                            icon: '👥',
                        },
                        {
                            title: 'Detailed Analytics',
                            description:
                                'Get insights into team performance and task completion rates.',
                            icon: '📊',
                        },
                    ].map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="text-5xl mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>


            <section className="bg-white py-16 px-4 md:px-10 lg:px-20">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Meet the Team</h2>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {[
                        { name: 'Alice Smith', role: 'Project Manager', img: '/team1.jpg' },
                        { name: 'Bob Johnson', role: 'Lead Developer', img: '/team2.jpg' },
                        { name: 'Clara Lee', role: 'UI/UX Designer', img: '/team3.jpg' },
                        { name: 'David Brown', role: 'Marketing Specialist', img: '/team4.jpg' },
                    ].map((member, index) => (
                        <div
                            key={index}
                            className="text-center bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            <img
                                src={member.img}
                                alt={member.name}
                                className="w-24 h-24 mx-auto rounded-full mb-4"
                            />
                            <h3 className="text-xl font-semibold">{member.name}</h3>
                            <p className="text-gray-500">{member.role}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-gradient-to-r from-purple-600 to-blue-500 text-white py-16 text-center">
                <h2 className="text-3xl font-semibold mb-4">Ready to Get Started?</h2>
                <p className="max-w-md mx-auto mb-8">
                    Join thousands of teams using our task management tool to boost their productivity.
                </p>
                <button className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-full hover:bg-gray-100 transition">
                    Start Your Free Trial
                </button>
            </section>
        </div>
    )
}

export default About