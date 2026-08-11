import FileUplodsModule from "../../../components/modules/FileUplodsModule";
import SubHeader from "../../../components/SubHeader";
import TableLayoutComp from "../../../components/Tables/TableLayoutComp";
import GridEditor from "../../../components/textEditor/GridEditor";

function Create() {
  return (
    <div>
      <SubHeader searchFilter={false}></SubHeader>
      <div className="cmsPage flex">
        <div className="itemLeft">
          <TableLayoutComp title={"Main Details of Page"}>
            <div className="detailPageCard cp">
              <div>
                <label htmlFor="name" className="label">
                  Page Title <span className="span">*</span>
                </label>
                <input
                  type="text"
                  className="input"
                  id="name"
                  placeholder="Enter Title"
                />
              </div>
              <div>
                <label htmlFor="content" className="label">
                  Content<span className="span">*</span>
                </label>
                <GridEditor />
              </div>
            </div>
          </TableLayoutComp>
        </div>
        <div className="itemRight">
          <TableLayoutComp title={"Publish"}>
            <div className="publishCard cp">
              <div>
                <label htmlFor="date" className="label">
                  Publish Date
                </label>
                <input
                  type="text"
                  className="input"
                  id="date"
                  value="2025-08-19"
                />
              </div>
              <div>
                <label htmlFor="template" className="label">
                  Template
                </label>
                <select name="template" id="template" className="input">
                  <option value="" selected disabled>
                    Select Template
                  </option>
                </select>
              </div>
              <div className="flex gap-4 cmt">
                <button className="submit">Submit</button>
                <button className="cancel">Cancel</button>
              </div>
            </div>
          </TableLayoutComp>
          <TableLayoutComp title={"Slug"}>
            <div className="cp">
              <input type="text" className="input" placeholder="Slug" />
            </div>
          </TableLayoutComp>
          <TableLayoutComp title={"Featured Image"}>
            <div className="cp">
              {/* <FileUplodsModule /> */}
            </div>
          </TableLayoutComp>
        </div>
      </div>
    </div>
  );
}

export default Create;
