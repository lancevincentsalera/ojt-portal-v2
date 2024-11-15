import React, { useState } from "react";

const AddTaskModalView = ({
  handleAddTaskModalAction,
  handleChange,
  handleTechstackChange,
  handleSkillChange,
  handleAddTaskAction,
  skills,
  techStacks,
  handleTypeFilterChange,
  handleNameFilterChange,
  handleCustomTechstackChange,
  handleCustomSkillChange,
  techStackIdList,
  skillIdList,
  addCustomTechstack,
  addCustomSkill,
  techStackList,
  skillList,
  skill,
  techStack,
  handleRemoveTechstack,
  handleRemoveSkill,
  allTechStacks,
  allSkills,
}) => {
  const commonTechStackType = [
    "Programming Language",
    "Version Control",
    "Markup Language",
    "Styling Language",
    "Web Framework",
    "Framework",
    "Others",
    "Custom Tech Stack",
  ];
  const [others, setOthers] = useState("");
  const handleOthersChange = (e) => {
    setOthers(e.target.value);
  };
  const [custom, setCustom] = useState("");
  const handleCustomChange = (e) => {
    setCustom(e.target.value);
  };
  return (
    <>
      <div className="modal-overlay" onClick={handleAddTaskModalAction}></div>
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <p className="heading">Add Task</p>
            <span className="close" onClick={handleAddTaskModalAction}>
              &times;
            </span>
          </div>
          <form className="modal-form no-subh">
            <input
              type="text"
              id="taskTitle"
              name="title"
              placeholder="Task Title"
              required
              onChange={handleChange}
            />
            <select
              name="difficulty"
              id="difficulty"
              defaultValue={""}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Difficulty
              </option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            <textarea
              id="description"
              name="description"
              placeholder="Description"
              className="large-textarea"
              required
              onChange={handleChange}
            />
            <p style={{ fontSize: "60%" }}>Tech Stacks</p>

            <div className="chip-container">
              {techStackList.map((techStack, index) => (
                <div className="chip" key={index}>
                  {techStack.name}
                  <span
                    className="remove-chip"
                    onClick={() =>
                      handleRemoveTechstack(
                        allTechStacks.find((t) => t.name === techStack.name)
                      )
                    }
                  >
                    &#10005;
                  </span>
                </div>
              ))}
            </div>

            <select
              name="techStacks"
              id="techStacks"
              onChange={(e) => {
                handleTypeFilterChange(e);
                handleOthersChange(e);
              }}
              defaultValue={""}
            >
              <option value="" disabled>
                Filter by type (e.g., Programming Language)
              </option>
              {commonTechStackType.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {others === "Others" && (
              <div
                style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
              >
                <input
                  type="text"
                  id="others"
                  name="others"
                  placeholder="Filter by type (Others)"
                  onChange={handleTypeFilterChange}
                />
              </div>
            )}
            {others === "Custom Tech Stack" ? (
              <>
                <input
                  type="text"
                  id="customName"
                  name="name"
                  placeholder="Custom Techstack Name"
                  onChange={handleCustomTechstackChange}
                  value={techStack.name}
                  required
                />
                <input
                  type="text"
                  id="customType"
                  name="type"
                  placeholder="Custom Techstack Type"
                  onChange={handleCustomTechstackChange}
                  value={techStack.type}
                  required
                />
                <textarea
                  className="large-textarea"
                  id="customDescription"
                  name="description"
                  placeholder="Custom Techstack Description"
                  onChange={handleCustomTechstackChange}
                  value={techStack.description}
                  required
                />
                <button
                  type="button"
                  className="button-main create"
                  onClick={addCustomTechstack}
                >
                  Add Custom Tech Stack
                </button>
              </>
            ) : (
              others !== "" && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    maxHeight: "100px",
                    overflow: "auto",
                    padding: "0.5rem 1rem",
                    border: "1px solid #ccc",
                    borderRadius: "10px",
                    marginBottom: "0.5rem",
                  }}
                >
                  {techStacks.map((techStack, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <input
                        type="checkbox"
                        name="name"
                        onChange={handleTechstackChange}
                        value={techStack.id}
                        style={{
                          height: "0.5rem",
                          width: "0.5rem",
                          marginBottom: "0",
                        }}
                        checked={techStackIdList.includes(techStack.id)}
                      />
                      <span style={{ fontSize: "60%" }}>{techStack.name}</span>
                    </div>
                  ))}
                </div>
              )
            )}

            <p style={{ fontSize: "60%" }}>Skills</p>

            <div className="chip-container">
              {skillList.map((skill, index) => (
                <div className="chip" key={index}>
                  {skill.name}
                  <span
                    className="remove-chip"
                    onClick={() =>
                      handleRemoveSkill(
                        allSkills.find((s) => s.name === skill.name)
                      )
                    }
                  >
                    &#10005;
                  </span>
                </div>
              ))}
            </div>

            <input
              type="text"
              id="nameFilter"
              name="nameFilter"
              placeholder="Filter by name (Hard/Soft Skills), type 'Custom' for custom skill"
              onChange={(e) => {
                handleNameFilterChange(e);
                handleCustomChange(e);
              }}
            />
            {custom.toLowerCase() === "custom" ? (
              <>
                <input
                  type="text"
                  id="customSkillName"
                  name="name"
                  placeholder="Custom Skill Name"
                  onChange={handleCustomSkillChange}
                  value={skill.name}
                  required
                />
                <textarea
                  className="large-textarea"
                  id="customSkillDescription"
                  name="description"
                  placeholder="Custom Skill Description"
                  onChange={handleCustomSkillChange}
                  value={skill.description}
                  required
                />
                <button
                  type="button"
                  className="button-main create"
                  onClick={addCustomSkill}
                >
                  Add Custom Skill
                </button>
              </>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  maxHeight: "100px",
                  overflow: "auto",
                  padding: "0.5rem 1rem",
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                }}
              >
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <input
                      type="checkbox"
                      name="name"
                      onChange={handleSkillChange}
                      value={skill.id}
                      style={{
                        height: "0.5rem",
                        width: "0.5rem",
                        marginBottom: "0",
                      }}
                      checked={skillIdList.includes(skill.id)}
                    />
                    <span style={{ fontSize: "60%" }}>{skill.name}</span>
                  </div>
                ))}
              </div>
            )}
            <div className="button-group double">
              <button
                type="button"
                className="button-secondary"
                onClick={handleAddTaskModalAction}
              >
                Cancel
              </button>
              <button
                type="button"
                className="button-main"
                onClick={handleAddTaskAction}
              >
                Confirm
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddTaskModalView;
