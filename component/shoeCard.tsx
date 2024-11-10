export default function ShoeCard({ shoeName, shoeImage }) {
    return (
        <div className="text-white">
            <div className="m-9">{shoeName}</div>
            <div className="m-5">
                <img width={210} height={210} src={shoeImage} alt="Shoe Image" />
            </div>
        </div>
    );
  }
  