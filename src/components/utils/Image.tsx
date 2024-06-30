
import images from '../../assets/images';

type IProps = {
    className: string;
    image: 'logo' | 'background';
}

const Image: React.FC<IProps> = ({ className, image }) => {
    return (
        <img 
            src={images[image]}
            alt='Logo'
            className={className}
        />
    )
};

export default Image;