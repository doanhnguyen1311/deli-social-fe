import { Editor, IAllProps } from './main/ts/components/Editor';

const NewRichTextEditor = (props: IAllProps) => {
    return (
        <Editor
            {...props}
            init={{
                menubar: false,
                plugins: [
                    'advlist', 'anchor', 'autolink', 'autosave', 'code', 'codesample', 'directionality', 'emoticons', 'fullscreen', 'help', 'image', 'insertdatetime', 'link', 'lists', 'media', 'nonbreaking', 'pagebreak', 'preview', 'save', 'searchreplace', 'table', 'template', 'visualblocks', 'visualchars', 'wordcount'
                ],
                toolbar: [
                    'undo redo | styles | bold italic underline strikethrough | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link code codesample | preview'
                ],
                content_style: 'body { font-family:Poppins, sans-serif; font-size:14px }'
            }}
        />
    )
}

export default NewRichTextEditor