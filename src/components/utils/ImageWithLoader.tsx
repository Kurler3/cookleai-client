import { FC, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";


type IProps = {
    imageUrl: string;
    loader: JSX.Element;
    imgClassName: string;
    altTxt: string;
    redirectTo?: string;
}

const ImageWithLoader: FC<IProps> = ({
    loader,
    imageUrl,
    imgClassName,
    altTxt,
    redirectTo,
}) => {

    // Image will always be loading initially.
    const [isLoadingImage, setIsLoadingImage] = useState(true);

    const onImgFinishLoad = () => {
        setIsLoadingImage(false);
    }

    const onImgLoadingErr = () => {
        toast.error('Failed to load image');
        setIsLoadingImage(false);
    }

    const imgComponent = (<img
        src={imageUrl}
        alt={altTxt}
        className={`${isLoadingImage && 'hidden'} ${imgClassName}`}
        onLoad={onImgFinishLoad}
        onError={onImgLoadingErr}
    />)


    return (
        <>

            {/* IF IS LOADING */}
            {
                isLoadingImage && loader
            }

            {
                redirectTo ? (

                    <Link to={redirectTo}>
                         {imgComponent}
                    </Link>

                ) : (
                    imgComponent
                )
            }

        </>
    )
}

export default ImageWithLoader