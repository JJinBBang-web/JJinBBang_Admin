import { Button } from "antd"
import { footerButtonClassName } from "../styles"

const ReviewAsideFooter = () => {
    return (
        <>
            <div className="grid grid-cols-4 gap-2 border-t border-border px-5 py-3.5">
                <Button className={footerButtonClassName}>마스킹</Button>
                <Button className={footerButtonClassName}>수정</Button>
                <Button
                    className={`${footerButtonClassName} text-danger!`}
                >
                    삭제
                </Button>
                <Button className={footerButtonClassName}>복구</Button>
            </div>
        </>
    )
}

export default ReviewAsideFooter;