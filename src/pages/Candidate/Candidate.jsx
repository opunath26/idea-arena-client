import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useLoaderData } from 'react-router';

const Candidate = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors } 
  } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const contestTypes = useLoaderData();

  const handleCandidateApplication = data => {
    
    const applicationData = {
      ...data,
      status: 'pending',
      workStatus: 'available'
    }
    console.log(applicationData);
    axiosSecure.post('/candidates', applicationData)
      .then(res => {
        if (res.data.insertedId) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your application has been submitted. We will reach to you in 7 days',
            showConfirmButton: false,
            timer: 2500
          });
        }
      })
  }


  return (
    <div className="flex justify-center bg-gray-100 px-4 py-12 min-h-screen">
      <div className="bg-white shadow-md p-8 md:p-10 rounded-2xl w-full max-w-4xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-bold text-primary text-3xl">
            Request to Become a Contest Candidate
          </h1>
          <p className="mt-3 max-w-2xl text-gray-600 leading-relaxed">
            Fill out the form below to request candidate access. Once your information
            is reviewed and approved by the admin, you will be eligible to participate
            in contests as a candidate.
          </p>
        </div>

        <hr className="mb-8" />

        <form onSubmit={handleSubmit(handleCandidateApplication)} className="space-y-6">

          {/* Full Name */}
          <div>
            <label className="block mb-1 font-medium text-gray-700 text-sm">
              Full Name
            </label>
            <input
              type="text"
              {...register('candidateName', { required: true })}
              placeholder="Enter your full name"
              className="px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary/40 w-full"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium text-gray-700 text-sm">
              Email Address
            </label>
            <input
              type="email"
              value={user?.email || ''}
              readOnly
              {...register('candidateEmail', { required: true })}
              placeholder="Enter your email address"
              className="px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary/40 w-full"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-1 font-medium text-gray-700 text-sm">
              Phone Number
            </label>
            <input
              type="text"
              {...register('candidateNumber', { required: true })}
              placeholder="Enter your phone number"
              className="px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary/40 w-full"
            />
          </div>

          {/* Contest Type Selection */}
          <div>
            <label className="block mb-1 font-medium text-gray-700 text-sm">
              Interested Contest Category
            </label>
            <select 
              {...register('contestType', { required: true })} 
              className="px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary/40 w-full"
            >
              <option value="">Select a category</option>
              {
                contestTypes && contestTypes.map((type, index) => (
                  <option key={index} value={type.contestType}>
                    {type.contestType}
                  </option>
                ))
              }
            </select>
          </div>

          {/* Skills */}
          <div>
            <label className="block mb-1 font-medium text-gray-700 text-sm">
              Primary Skills
            </label>
            <input
              type="text"
              {...register('candidateSkills', { required: true })}
              placeholder="e.g. UI Design, Web Development, Content Writing"
              className="px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary/40 w-full"
            />
          </div>

          {/* Experience */}
          <div>
            <label className="block mb-1 font-medium text-gray-700 text-sm">
              Experience Level
            </label>
            <select {...register('candidateExperience', { required: true })} className="px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary/40 w-full">
              <option value="">Select your experience level</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

          {/* Reason */}
          <div>
            <label className="block mb-1 font-medium text-gray-700 text-sm">
              Why do you want to become a candidate?
            </label>
            <textarea
              rows="4"
              {...register('reason')}
              placeholder="Write a short explanation"
              className="px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary/40 w-full resize-none"
            ></textarea>
          </div>

          {/* Note */}
          <div className="bg-yellow-50 p-4 border border-yellow-200 rounded-lg">
            <p

              className="text-yellow-700 text-sm">
              Note: Submitting this form does not guarantee candidate approval.
              Admin approval is required before you can participate in contests.
            </p>
          </div>

          {/* Submit Button */}
          <input
            type="submit"
            className="hover:bg-primary/90 py-3 rounded-lg w-full font-semibold text-white transition btn-primary btn" value="Submit Request"
          />

        </form>
      </div>
    </div>

  );
};

export default Candidate;