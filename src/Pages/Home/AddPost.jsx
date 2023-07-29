import { useState } from "react";
import UseAuthContext from "../../Hooks/UseAuthContext";
import frame from "./../../assets/photo-frame.png"
import moment from 'moment';
// TODO: Change the alert into sweetAlert
const AddPost = () => {
    const {user} = UseAuthContext();
    const [selectedImages, setSelectedImages] = useState([]);
    const [imagesList,setImagesList] = useState([]);
    const [text,setText] = useState("");
    // const hostingUrl = `https://api.imgbb.com/1/upload?key=${
    //     import.meta.env.VITE_IMAGE_KEY
    // }`;
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


    console.log(imagesList);
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
    console.log(text.length);
    const postText = (e) => {
        setText(e.target.value);
    }
    const handlePost = () => {

    }
    return (
        <section className="bg-white p-3 my-5 rounded-lg shadow-2xl flex items-center justify-between">
            <button className="w-[10%]">
                <img src={user?.photoURL} alt="" className="w-14 h-14 rounded-full"/>
            </button>
            <button className="w-[80%] text-xl font-mono bg-gray-200 py-2 px-5 text-left rounded-3xl">Express your feelings!</button>
            <button className="w-fit">
                <img src={frame} alt="" />
            </button>
            <div className="fixed w-full bg-[#000] bg-opacity-50 h-screen top-0 left-0 flex items-center justify-center ">
                <div className="bg-white w-[500px] max-h-[90vh] jm_shadow rounded-md overflow-auto p-5 ">
                    <div className="flex justify-between ">
                        <div className="flex gap-5">
                            <img src={user?.photoURL} alt="profiles image" className="w-16 h-16 rounded-full border"/>
                            <div className="">
                                <h2 className="font-semibold text-xl">{user?.displayName}</h2>
                                <p>{moment().format('MMM Do yy, dddd.')}</p>
                            </div>
                        </div>
                        <form>
                            <label htmlFor="image" className="cursor-pointer"><img src={frame} alt="" /></label>
                            <input type="file" multiple={selectedImages.length > 0 ? false : true} onChange={handleImageSelect} name="image" id="image" className="hidden"/>
                        </form>
                    </div>
                    <div className="rounded-md">
                        <form action="" className="mt-3">
                            <textarea onChange={postText} className={`outline-none w-full text-2xl placeholder:text-[#777] overflow-auto resize-none ${(text.length > 50 ) ? "text-lg h-40 " : ""}`} placeholder="Express your feelings!...."></textarea>
                        </form>
                        <div className="my-3 rounded-md overflow-hidden">
                            {selectedImages.map((image, index) => (
                                <img
                                key={index}
                                src={image}
                                className="max-h-screen w-full object-cover"
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