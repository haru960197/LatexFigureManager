export const ImageList = ({imageInfoList}) => {
    return (
      <ul>
        {imageInfoList.map((imageInfo) => (
          <li key={imageInfo.id}>
            <>
              <img width="300" src={imageInfo.base64data} />
              <ul>
                <li>ファイル名: {imageInfo.object.name}</li>
                <li>caption: {imageInfo.caption}</li>
                <li>label: {imageInfo.label}</li>
              </ul>
            </>
          </li>
        ))}
      </ul>
    );
};