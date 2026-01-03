import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../utils/api';

function Dashboard() {
    const [complaints, setComplaints] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const data = await api.getAllComplaints();
                setComplaints(data);
            } catch (error) {
                console.error('Error fetching complaints:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchComplaints();
    }, []);

    // Calculate statistics
    const totalComplaints = complaints.length;
    const statusCounts = {
        submitted: complaints.filter(c => c.status === 'submitted').length,
        inProgress: complaints.filter(c => c.status === 'in-progress').length,
        reviewed: complaints.filter(c => c.status === 'reviewed').length,
        resolved: complaints.filter(c => c.status === 'resolved').length
    };

    // Get status badge styling
    const getStatusBadge = (status) => {
        const styles = {
            'submitted': 'bg-blue-100 text-blue-800 border-blue-300',
            'in-progress': 'bg-yellow-100 text-yellow-800 border-yellow-300',
            'reviewed': 'bg-purple-100 text-purple-800 border-purple-300',
            'resolved': 'bg-green-100 text-green-800 border-green-300'
        };
        const labels = {
            'submitted': 'Submitted',
            'in-progress': 'In Progress',
            'reviewed': 'Reviewed',
            'resolved': 'Resolved'
        };
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[status]}`}>
                {labels[status]}
            </span>
        );
    };

    // Get priority badge styling
    const getPriorityBadge = (priority) => {
        const styles = {
            'high': 'bg-red-100 text-red-800 border-red-300',
            'medium': 'bg-orange-100 text-orange-800 border-orange-300',
            'low': 'bg-gray-100 text-gray-800 border-gray-300'
        };
        const icons = {
            'high': '🔴',
            'medium': '🟡',
            'low': '⚪'
        };
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[priority]}`}>
                {icons[priority]} {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
            </span>
        );
    };

    // Get input type badge
    const getInputTypeBadge = (type) => {
        const styles = {
            'text': 'bg-indigo-100 text-indigo-800 border-indigo-300',
            'voice': 'bg-pink-100 text-pink-800 border-pink-300'
        };
        const icons = {
            'text': '✍️',
            'voice': '🎤'
        };
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[type]}`}>
                {icons[type]} {type.charAt(0).toUpperCase() + type.slice(1)}
            </span>
        );
    };
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-2xl font-bold animate-pulse">Loading Complaints...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6 md:mb-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
                    <div>
                        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2">My Complaints Dashboard</h1>
                        <p className="text-sm md:text-base text-gray-600">Track and manage all your submitted complaints</p>
                    </div>
                    <Link className='w-full sm:w-auto bg-black text-white px-7 py-3 rounded-xl hover:bg-gray-900 transition flex items-center justify-center gap-2 shadow-lg active:scale-95' to='/complaint'>
                        <span className='text-xl font-bold'>+</span> New Complaint
                    </Link>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 mb-8">
                    {/* Total Complaints */}
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6 rounded-xl shadow-lg flex justify-between items-center sm:col-span-2 lg:col-span-1">
                        <div>
                            <p className="text-gray-700 text-xs font-semibold uppercase tracking-wider">Total</p>
                            <p className="text-3xl md:text-4xl text-black mt-1">{totalComplaints}</p>
                        </div>
                        <div className="text-4xl opacity-20">📊</div>
                    </div>

                    {/* Submitted */}
                    <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-blue-100 flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-xs font-bold uppercase">Submitted</p>
                            <p className="text-2xl md:text-3xl font-black text-blue-600 mt-1">{statusCounts.submitted}</p>
                        </div>
                        <div className="text-3xl opacity-30">📝</div>
                    </div>

                    {/* In Progress */}
                    <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-yellow-100 flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-xs font-bold uppercase">In Progress</p>
                            <p className="text-2xl md:text-3xl font-black text-yellow-600 mt-1">{statusCounts.inProgress}</p>
                        </div>
                        <div className="text-3xl opacity-30">⏳</div>
                    </div>

                    {/* Reviewed */}
                    <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-purple-100 flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-xs font-bold uppercase">Reviewed</p>
                            <p className="text-2xl md:text-3xl font-black text-purple-600 mt-1">{statusCounts.reviewed}</p>
                        </div>
                        <div className="text-3xl opacity-30">👁️</div>
                    </div>

                    {/* Resolved */}
                    <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-green-100 flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-xs font-bold uppercase">Resolved</p>
                            <p className="text-2xl md:text-3xl font-black text-green-600 mt-1">{statusCounts.resolved}</p>
                        </div>
                        <div className="text-3xl opacity-30">✅</div>
                    </div>
                </div>

                {/* Complaints List Section */}
                <div className="mb-6 space-y-2">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800">All Complaints</h2>
                    <div className="h-1 w-20 bg-blue-600 rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {complaints.map((complaint) => (
                        <div
                            key={complaint.id}
                            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-blue-300 transform hover:scale-[1.02]"
                        >
                            {/* Card Header */}
                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 border-b border-gray-200">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-bold text-gray-800 flex-1">{complaint.category || "General Complaint"}</h3>
                                    <span className="text-xs text-gray-500 ml-2">#{complaint.id}</span>
                                </div>
                                <p className="text-xs text-gray-500">
                                    📍 {complaint.location || "Unknown"}
                                </p>
                            </div>

                            {/* Card Body */}
                            <div className="p-4">
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{complaint.description}</p>

                                {/* Category */}
                                <div className="mb-3">
                                    <span className="text-xs text-gray-500">Category: </span>
                                    <span className="text-sm font-semibold text-gray-700">{complaint.category || "Unclassified"}</span>
                                </div>

                                {/* Badges */}
                                <div className="space-y-2">
                                    {/* Status */}
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-gray-500 w-16">Status:</span>
                                        {getStatusBadge(complaint.status?.toLowerCase() || 'submitted')}
                                    </div>

                                    {/* Priority */}
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-gray-500 w-16">Priority:</span>
                                        {getPriorityBadge(complaint.severity?.toLowerCase() || 'medium')}
                                    </div>
                                </div>
                            </div>

                            {/* Card Footer */}
                            <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
                                <button className="w-full text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
                                    View Details →
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State (if no complaints) */}
                {complaints.length === 0 && (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">📭</div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">No Complaints Yet</h3>
                        <p className="text-gray-600">You haven't submitted any complaints yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
