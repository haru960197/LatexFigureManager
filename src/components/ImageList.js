export const ImageList = ({imageInfoList}) => {
    return (
      <ul>
        {imageInfoList.map((imageInfo) => (
          <li key={imageInfo.id}>
            <>
              <img width="300" src={imageInfo.base64data} />
              <label>{imageInfo.object.name}</label>
            </>
          </li>
        ))}
      </ul>
    );
};