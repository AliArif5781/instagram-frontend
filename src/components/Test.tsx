// import React, { useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "../store/hook";
// import { fetchReelPostsThunk } from "../store/postSlice/post.thunk";

// const Test = () => {
//   const dispatch = useAppDispatch();
//   const { userProfile } = useAppSelector((state) => state.user);
//   const { posts } = useAppSelector((state) => state.post.reels);

//   useEffect(() => {
//     dispatch(fetchReelPostsThunk({ limit: 3 }));
//   }, [dispatch]);

//   console.log(posts);
//   return (
//     <div className="min-h-screen text-white">
//       {posts.map((post, index) => (
//         <div key={index} className="h-screen grid grid-cols-12">
//           <div className="col-span-6 flex items-end justify-start p-8">
//             <div className="w-full max-w-2xl">
//               {/* Author Info with Profile */}
//               <div className="flex items-center gap-4 mb-6">
//                 <img
//                   src={post.author.profileImage}
//                   alt={post.author.username}
//                   className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
//                 />
//                 <div>
//                   <h3 className="text-xl font-semibold text-white">
//                     {post.author.username}
//                   </h3>
//                   <p className="text-gray-300 text-sm">
//                     {post.author.fullName}
//                   </p>
//                 </div>
//               </div>

//               {/* Caption */}
//               {post.caption && (
//                 <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
//                   <p className="text-white text-lg leading-relaxed">
//                     {post.caption}
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>
//           <div className="col-span-6 flex justify-center items-center">
//             <div className="m-auto">
//               {post.mediaType === "video" ? (
//                 <video
//                   src={post.imageUrl}
//                   className="h-[90vh] rounded-lg"
//                   controls
//                   muted
//                 />
//               ) : (
//                 <img
//                   src={post.imageUrl}
//                   alt={post.caption || "Post image"}
//                   className="h-[90vh] rounded-lg object-contain"
//                 />
//               )}
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Test;
