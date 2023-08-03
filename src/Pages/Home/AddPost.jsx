import { useRef, useState } from "react";
import UseAuthContext from "../../Hooks/UseAuthContext";
import frame from "./../../assets/photo-frame.png"
import moment from 'moment';
import { FaTimes, FaTimesCircle } from "react-icons/fa";
import useaxiosSecure from "../../Hooks/useaxiosSecure";
import usePost from "../../Hooks/usePost";
import Swal from "sweetalert2";
// TODO: Change the alert into sweetAlert
const AddPost = () => {
    const {user} = UseAuthContext();
    const [modal,setModal] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [imagesList,setImagesList] = useState([]);
    const [text,setText] = useState("");
    const fileInputRef = useRef(null);
    const hostingUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_KEY}`;
    const {axiosSecured} = useaxiosSecure();
    const {postRefetch} = usePost();
    
    let imagePreviews = [];
    const handleImageSelect = (event) => {
        if(selectedImages.length >= 4){
            alert('cannot select images more than 4 ');
            return
        }
        const imageFiles = event.target.files;
        if(imageFiles.length > 4){
            alert('cannot select images more than 4 ');
            return
        }
        setImagesList(imageFiles)
        
        // Read each selected image and create an array of preview URLs
        // TODO: multiple Image preview
        for (let i = 0; i < imageFiles.length; i++) {
            const reader = new FileReader();
            
            reader.onloadend = () => {
            imagePreviews.push(...selectedImages,reader.result);
            setSelectedImages(imagePreviews);
          };
    
          if (imageFiles[i]) {
            reader.readAsDataURL(imageFiles[i]);
          }
        }
    };

    const postText = (e) => {
        setText(e.target.value);
    }


    const handleRemoveImage = ( ) => {
        setSelectedImages([])
        setImagesList([])
        fileInputRef.current.value = '';
    }
    const handlePost = () => {
        if(imagesList.length > 0){
            const formData = new FormData();
            // TODO: Multiple image selected 
            // for (let i = 0; i < imagesList.length; i++) {
            //     console.log(`ping ,${i}`);
            //     formData.append(`image ${i}`, imagesList[i])
            // }
            formData.append('image', imagesList[0]) 
            fetch(hostingUrl, {
                method: "POST",
                body: formData,
            })
                .then((res) => res.json())
                .then((data) => {
                    if(data.success){
                        const post = {
                            image: data?.data?.display_url,
                            timeStamp: Date(),
                            profileImage: user?.photoURL,
                            profileName: user?.displayName,
                            like: 0,
                            postText: text
                        }
                        axiosSecured.post('/add-post',post)
                        .then(data => {
                            if(data?.data?.insertedId){
                                setModal(false);
                                postRefetch();
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Add post successfully',
                                    showConfirmButton: false,
                                    timer: 1500
                                  })
                            }
                        })
                    }
                })
        }
        else{
            const post = {
                timeStamp: Date(),
                profileImage: user?.photoURL,
                profileName: user?.displayName,
                like: 0,
                postText: text
            }
            axiosSecured.post('/add-post',post)
            .then(data => {
                if(data?.data?.insertedId){
                    setModal(false);
                    postRefetch();
                    Swal.fire({
                        icon: 'success',
                        title: 'Add post successfully',
                        showConfirmButton: false,
                        timer: 1500
                      })
                }
            })
        }
    };

    return (
        <section className="bg-white rounded-lg">
            <div className="p-3 my-5  shadow-2xl flex items-center justify-between">
                <button className="w-[10%]">
                    <img src={user?.photoURL} alt="" className="w-14 h-14 rounded-full object-cover"/>
                </button>
                <button onClick={() => setModal(true)} className="w-[80%] text-xl font-mono bg-gray-200 py-2 px-5 text-left rounded-3xl">Express your feelings!</button>
                <button onClick={() => setModal(true)} className="w-fit">
                    <img src={frame} alt="" />
                </button>
            </div>
            {/*======================== Modal ====================== */}
            <div className={`fixed w-full bg-[#000] bg-opacity-50 h-screen top-0 left-0 items-center justify-center ${modal ? "flex" : "hidden"}`}>
                <div className="bg-white w-[500px] max-h-[90vh] jm_shadow rounded-md overflow-auto p-5 relative">
                    <div className="border-b-2 pb-3 mb-5">
                        <h2 className="text-center text-3xl">Create Post</h2>
                    </div>
                    <button onClick={() => setModal(false)} className="absolute z-40 text-3xl top-2 right-2"><FaTimes/></button>
                    <div className="flex justify-between ">
                        <div className="flex gap-5">
                            <img src={user?.photoURL} alt="profiles image" className="w-16 h-16 rounded-full border object-cover"/>
                            <div className="">
                                <h2 className="font-semibold text-xl">{user?.displayName}</h2>
                                <p>{moment().format('MMM Do yy, dddd.')}</p>
                            </div>
                        </div>
                        <form >
                            <label htmlFor={`${selectedImages.length > 0 ? "" : "image"}`} className={`cursor-pointer ${selectedImages.length > 0 ? "opacity-50 cursor-no-drop" : ""}`}><img src={frame} alt="" /></label>
                            {/* TODO: Multiple image selected */}
                            {/* multiple={selectedImages.length > 0 ? false : true} */}
                            <input type="file" ref={fileInputRef} onChange={handleImageSelect} name="image" id="image" className="hidden"/>
                        </form>
                    </div>
                    <div className="rounded-md">
                        <form action="" className="mt-3">
                            <textarea onChange={postText} className={`outline-none w-full text-2xl placeholder:text-[#777] overflow-auto resize-none ${(text.length > 50 ) ? "text-base h-40 " : "h-28"}`} placeholder="Express your feelings!...."></textarea>
                        </form>
                        {/* TODO: Multiple image grid layout */}
                        {/* ${(selectedImages.length == 2 || selectedImages.length == 4) ? "grid-cols-2" 
                            :(selectedImages.length == 3) ? "grid-cols-3" 
                            :(selectedImages.length == 4) ? "jm_grid_four" 
                            :(selectedImages.length == 0) ? "hidden" :
                            "grid-cols-1"
                            } */}
                        <div className={`my-3 rounded-lg p-2 overflow-hidden gap-3 grid max-h-fit relative border-2 ${(selectedImages.length == 0) ? "hidden" :
                            "block"}`}>
                            <button onClick={handleRemoveImage} className="absolute top-0 right-0 text-red-600 text-2xl border-2 border-white bg-white rounded-full"><FaTimesCircle/></button>
                            {/* TODO: Multiple Image select */}
                            {selectedImages.map((image, index) => (
                                <img
                                key={index}
                                src={image}
                                className="h-full max-h-screen w-full object-cover border rounded-lg"
                                alt={`Selected Preview ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                    <button onClick={handlePost} className="btn btn-primary w-full">Post</button>
                </div>
            </div>
        </section>
    );
};

export default AddPost;