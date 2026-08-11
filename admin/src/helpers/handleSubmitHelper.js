export default function handleSubmitHelper(
  initialValues,
  validation = [],
  setError
) {
  let status = true;
  const newErrors = {};
  validation?.forEach((rule) => {
    const value = (initialValues[rule?.key] || "").trim();

    if (rule?.required && !value) {
      (newErrors[rule?.key] = `${rule?.key} field is required`),
        (status = false);
    }
    if (value?.length < rule.maxLength) {
      (newErrors[
        rule?.key
      ] = `${rule?.key} must be at least ${rule?.maxLength} characters.`),
        (status = false);
    }
    if (rule?.key === "email") {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const isValid = emailRegex.test(initialValues?.email);
      if (!isValid) {
        (newErrors[rule?.key] = `Enter valid ${rule?.key} address`),
          (status = false);
      }
    }
    setError(newErrors);
    if (status) {
      setError({});
    }
  });

  if (status) {
    let galleryFiles = initialValues?.gallery || [];
    let documentFiles = initialValues?.document || [];
    let hasInstance = Object?.entries(initialValues)?.some(
      ([key, value]) =>
        value instanceof File ||
        galleryFiles?.some((f) => f?.file instanceof File) ||
        documentFiles?.some((f) => f?.file instanceof File)
    );
    if (hasInstance) {
      delete initialValues?.gallery;
      delete initialValues?.document;
      let formData = new FormData();
      for (let key in initialValues) {
        formData.append(key, initialValues[key]);
      }

      if (galleryFiles?.length > 0) {
        galleryFiles.forEach((file) => {
          if (file?.file instanceof File) {
            formData.append("gallery", file.file);
          }
        });
      }

      if (documentFiles?.length > 0) {
        documentFiles.forEach((file) => {
          if (file?.file instanceof File) {
            formData.append("document", file.file);
          }
        });
      }
      return formData;
    } else {
      return JSON.stringify(initialValues);
    }
  }
}
