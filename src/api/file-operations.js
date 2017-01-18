import FacebookActions from 'store/actions/facebook';

export default class FileOperations
{
    static readImageFile(file, callback)
    {
        if (file)
        {
            const reader = new FileReader();
            reader.onload = (e) =>
            {
                const contents = e.target.result;
                const image = new Blob([contents], { type: file.type });
                callback(image);
            };
            reader.readAsArrayBuffer(file);
        }
    }
}
