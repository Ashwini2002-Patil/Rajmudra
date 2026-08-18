import clsx from "clsx"

const Container = ({ children, className }) => (
  <div className={clsx("container-page", className)}>{children}</div>
)

export default Container
