import { FormEvent, useState } from "react";
import { schoolParams } from "../../../../shared/types";
import "./formStyle.css";

export const SchoolAddForm = ({
  handleSubmit,
}: {
  handleSubmit: (event: FormEvent<HTMLFormElement>, schoolInstitution: schoolParams) => void;
}) => {
  const [schoolInstitution, setSchoolInstitution] = useState<schoolParams>({
    name: "",
    director: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
    email: "",
    website: "",
    municipality: "",
  });

  return (
    <form onSubmit={(e) => handleSubmit(e, schoolInstitution)} className="form-container">
      <label>
        Name:
        <input
          type="text"
          value={schoolInstitution.name}
          onChange={(e) => setSchoolInstitution({ ...schoolInstitution, name: e.target.value })}
        />
      </label>

      <label>
        Director:
        <input
          type="text"
          value={schoolInstitution.director}
          onChange={(e) => setSchoolInstitution({ ...schoolInstitution, director: e.target.value })}
        />
      </label>

      <label>
        Address:
        <input
          type="text"
          value={schoolInstitution.address}
          onChange={(e) => setSchoolInstitution({ ...schoolInstitution, address: e.target.value })}
        />
      </label>

      <label>
        City:
        <input
          type="text"
          value={schoolInstitution.city}
          onChange={(e) => setSchoolInstitution({ ...schoolInstitution, city: e.target.value })}
        />
      </label>

      <label>
        Postal Code:
        <input
          type="text"
          value={schoolInstitution.postalCode}
          onChange={(e) => setSchoolInstitution({ ...schoolInstitution, postalCode: e.target.value })}
        />
      </label>

      <label>
        Phone:
        <input
          type="text"
          value={schoolInstitution.phone}
          onChange={(e) => setSchoolInstitution({ ...schoolInstitution, phone: e.target.value })}
        />
      </label>

      <label>
        Email:
        <input
          type="email"
          value={schoolInstitution.email}
          onChange={(e) => setSchoolInstitution({ ...schoolInstitution, email: e.target.value })}
        />
      </label>

      <label>
        Website:
        <input
          type="url"
          value={schoolInstitution.website}
          onChange={(e) => setSchoolInstitution({ ...schoolInstitution, website: e.target.value })}
        />
      </label>

      <label>
        Municipality:
        <input
          type="text"
          value={schoolInstitution.municipality}
          onChange={(e) => setSchoolInstitution({ ...schoolInstitution, municipality: e.target.value })}
        />
      </label>

      <button type="submit">Dodaj</button>
    </form>
  );
};
