import { mainDomain } from "@/utils/mainDomain";

// Helper برای ایجاد query string
const createQueryString = (params) => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, value);
    }
  });
  return searchParams.toString();
};

export const getProducts = async (data) => {
  try {
    const params = {
      LangCode: "fa",
      PageSize: data.pageSize,
      PageIndex: data.page,
      OrderBy: data.orderBy || "5",
      ...(data.BrandId && { BrandId: data.BrandId }),
      ...(data.CategoryId && { CategoryId: data.CategoryId }),
      ...(data.price1 && data.price1 !== 0 && { Price1: data.price1 }),
      ...(data.price2 && data.price2 !== 100000 && { Price2: data.price2 }),
      ...(data.OnlyPrice && { OnlyPrice: data.OnlyPrice }),
      ...(data.OnlyDiscount && { OnlyDiscount: data.OnlyDiscount }),
      ...(data.StatusId && { StatusId: data.StatusId }),
      ...(data.OnlyFest && { OnlyFest: data.OnlyFest }),
      ...(data.ConditionId && { ConditionId: data.ConditionId }),
      ...(data.Filters && { Filters: data.Filters }),
    };

    const queryString = createQueryString(params);
    const url = `${mainDomain}/api/Product${
      queryString ? `?${queryString}` : ""
    }`;

    // درخواست fetch با cache و revalidate
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // cache: "force-cache", // استفاده از cache
      next: { revalidate: 60 }, // revalidate هر 60 ثانیه
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    return {
      type: "error",
      message: "خطای شبکه",
    };
  }
};

export const getProductId = async (id) => {
  try {
    const url = `${mainDomain}/api/Product/${id}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // cache: "force-cache",
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    return {
      type: "error",
      message: "خطای شبکه",
    };
  }
};

export const getProductListId = async (data) => {
  try {
    const url = `${mainDomain}/api/Product/GetListByIds`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      // cache: "force-cache",
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    return {
      type: "error",
      message: "خطای شبکه",
    };
  }
};

export const getRelatedProductsByIdString = async (relatedIdsString) => {
  try {
    if (!relatedIdsString) return [];

    const ids = relatedIdsString.split(",").map((id) => parseInt(id));
    const data = { ids };

    return await getProductListId(data);
  } catch (error) {
    return [];
  }
};

export const getProductAction = async () => {
  try {
    const url = `${mainDomain}/api/Product/Auction?langCode=fa`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // cache: "force-cache",
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    return {
      type: "error",
      message: "خطای شبکه",
    };
  }
};

export const getProductTerm = async (term, catIds) => {
  try {
    const params = {
      langCode: "fa",
      term,
      catIds,
      pageSize: 50,
      page: 1,
    };

    const queryString = createQueryString(params);
    const url = `${mainDomain}/api/Product/FindByTerm${
      queryString ? `?${queryString}` : ""
    }`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // cache: "force-cache",
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    return null;
  }
};

export const getProductPricing = async (categoryId) => {
  try {
    const url = `${mainDomain}/api/Product/Pricing?categoryId=${categoryId}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // cache: "force-cache",
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    return {
      type: "error",
      message: "خطای شبکه",
    };
  }
};

export const getProductCategory = async (categoryId, id2) => {
  try {
    let url = `${mainDomain}/api/Product/Category/${categoryId}`;

    if (id2) {
      url += `?id2=${id2}`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // cache: "force-cache",
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    return {
      type: "error",
      message: "خطای شبکه",
    };
  }
};

export const fetchNotifyAvailable = async (id, token) => {
  try {
    const url = `${mainDomain}/api/Product/NotifyAvailable/${id}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      // cache: "force-cache",
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    return {
      type: "error",
      message: "خطای شبکه",
    };
  }
};
