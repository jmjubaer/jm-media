import { useState } from "react";
import UseAuthContext from "../../Hooks/UseAuthContext";
import frame from "./../../assets/photo-frame.png"
import moment from 'moment';
import { FaTimesCircle } from "react-icons/fa";
// TODO: Change the alert into sweetAlert
const AddPost = () => {
    const {user} = UseAuthContext();
    const [selectedImages, setSelectedImages] = useState([]);
    const [imagesList,setImagesList] = useState([]);
    const [text,setText] = useState("");
    const hostingUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_KEY}`;
    
    // const handleHostImage = async(e) => {
    //     const image = Array.from(e.target.files)
    //     setImages(image)
    // }
    // console.log(images);
    // useEffect(() => {
    //     if(images.length > 0) {
    //         const formData = new FormData();
    //         // images.forEach((image, index) => {
    //         //   formData.append(`image_${index}`, image);
    //         // });
    //         console.log(images[0]);
    //         formData.append('image', images[0]);
    //         console.log(formData);
    //         fetch(hostingUrl, {
    //             method: 'POST',
    //             body: JSON.stringify(formData)
    //         }).then(res => res.json())
    //         .then(data => {
    //             console.log(data);
    //         })
    //     }
    // },[images])

    // imagesList.push(...images,event.target.files[0])
    // setImages(imagesList)
    // const imagesList = [];


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
        let imagePreviews = [];
        
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

    console.log(imagesList);

    const handleRemoveImage = ( ) => {
        setSelectedImages([])
        setImagesList([])
    }

    const handlePost = () => {
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
                console.log(data);
            })
    }
    return (
        <section className="bg-white p-3 my-5 rounded-lg shadow-2xl flex items-center justify-between">
            <button className="w-[10%]">
                <img src={user?.photoURL} alt="" className="w-14 h-14 rounded-full object-cover"/>
            </button>
            <button className="w-[80%] text-xl font-mono bg-gray-200 py-2 px-5 text-left rounded-3xl">Express your feelings!</button>
            <button className="w-fit">
                <img src={frame} alt="" />
            </button>
            {/*======================== Modal ====================== */}
            <div className="fixed w-full bg-[#000] bg-opacity-50 h-screen top-0 left-0 flex items-center justify-center">
                <div className="bg-white w-[500px] max-h-[90vh] jm_shadow rounded-md overflow-auto p-5 ">
                    <div className="flex justify-between ">
                        <div className="flex gap-5">
                            <img src={user?.photoURL} alt="profiles image" className="w-16 h-16 rounded-full border object-cover"/>
                            <div className="">
                                <h2 className="font-semibold text-xl">{user?.displayName}</h2>
                                <p>{moment().format('MMM Do yy, dddd.')}</p>
                            </div>
                        </div>
                        <form>
                            <label htmlFor={`${selectedImages.length > 0 ? "" : "image"}`} className={`cursor-pointer ${selectedImages.length > 0 ? "cursor-not-allowed opacity-50" : ""}`}><img src={frame} alt="" /></label>
                            {/* TODO: Multiple image selected */}
                            {/* multiple={selectedImages.length > 0 ? false : true} */}
                            <input type="file" onChange={handleImageSelect} name="image" id="image" className="hidden"/>
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