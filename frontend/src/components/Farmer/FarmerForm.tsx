import React, { useState } from 'react';
import { Upload, Camera, Save } from 'lucide-react';
import { Button } from '../UI/Button';
import { Input } from '../UI/Input';
import { Card } from '../UI/Card';

export const FarmerForm: React.FC = () => {
  const [formData, setFormData] = useState({
    cropType: '',
    variety: '',
    harvestDate: '',
    location: '',
    quantity: '',
    unit: 'kg',
    certifications: [] as string[],
    imageUrl: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const cropTypes = [
    'Tomatoes',
    'Lettuce',
    'Apples',
    'Carrots',
    'Peppers',
    'Potatoes',
    'Onions',
    'Spinach',
  ];
  const certificationOptions = [
    'Organic',
    'Non-GMO',
    'Fair Trade',
    'Local',
    'Pesticide-Free',
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.cropType) newErrors.cropType = 'Crop type is required';
    if (!formData.variety) newErrors.variety = 'Variety is required';
    if (!formData.harvestDate) newErrors.harvestDate = 'Harvest date is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.quantity || parseFloat(formData.quantity) <= 0) {
      newErrors.quantity = 'Valid quantity is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setSubmitSuccess(true);

    setTimeout(() => {
      setFormData({
        cropType: '',
        variety: '',
        harvestDate: '',
        location: '',
        quantity: '',
        unit: 'kg',
        certifications: [],
        imageUrl: '',
      });
      setSubmitSuccess(false);
    }, 3000);
  };

  const handleImageUpload = () => {
    const mockImageUrl =
      'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg';
    setFormData((prev) => ({ ...prev, imageUrl: mockImageUrl }));
  };

  const toggleCertification = (cert: string) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.includes(cert)
        ? prev.certifications.filter((c) => c !== cert)
        : [...prev.certifications, cert],
    }));
  };

  if (submitSuccess) {
    return (
      <Card className="max-w-2xl">
        <div className="text-center py-8 px-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Save className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Batch Submitted Successfully!
          </h3>
          <p className="text-gray-600 text-sm sm:text-base">
            Your produce batch has been recorded on the blockchain and is now
            traceable.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card
      title="Submit New Produce Batch"
      subtitle="Record your harvest details for blockchain tracking"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Crop type + Variety */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Crop Type <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.cropType}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, cropType: e.target.value }))
              }
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
            >
              <option value="">Select crop type</option>
              {cropTypes.map((crop) => (
                <option key={crop} value={crop}>
                  {crop}
                </option>
              ))}
            </select>
            {errors.cropType && (
              <p className="mt-1 text-sm text-red-600">{errors.cropType}</p>
            )}
          </div>

          <Input
            label="Variety"
            value={formData.variety}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, variety: value }))
            }
            placeholder="e.g., Roma, Iceberg"
            required
            error={errors.variety}
          />
        </div>

        {/* Harvest date + Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Harvest Date"
            type="date"
            value={formData.harvestDate}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, harvestDate: value }))
            }
            required
            error={errors.harvestDate}
          />

          <Input
            label="Location"
            value={formData.location}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, location: value }))
            }
            placeholder="Farm name and location"
            required
            error={errors.location}
          />
        </div>

        {/* Quantity + Unit */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Input
              label="Quantity"
              type="number"
              value={formData.quantity}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, quantity: value }))
              }
              placeholder="0"
              required
              error={errors.quantity}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Unit
            </label>
            <select
              value={formData.unit}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, unit: e.target.value }))
              }
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
            >
              <option value="kg">Kilograms</option>
              <option value="lbs">Pounds</option>
              <option value="tons">Tons</option>
              <option value="boxes">Boxes</option>
            </select>
          </div>
        </div>

        {/* Certifications */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Certifications
          </label>
          <div className="flex flex-wrap gap-2">
            {certificationOptions.map((cert) => (
              <button
                key={cert}
                type="button"
                onClick={() => toggleCertification(cert)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                  formData.certifications.includes(cert)
                    ? 'bg-green-100 text-green-800 border border-green-200'
                    : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                }`}
              >
                {cert}
              </button>
            ))}
          </div>
        </div>

        {/* Image upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Produce Images
          </label>
          <div className="space-y-3">
            {formData.imageUrl ? (
              <div className="relative">
                <img
                  src={formData.imageUrl}
                  alt="Produce"
                  className="w-full h-48 object-cover rounded-lg border border-gray-200"
                />
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, imageUrl: '' }))
                  }
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors duration-200"
                >
                  ×
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <div className="text-center">
                  <Camera className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm text-gray-600 mb-3">
                    Upload images of your produce
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    icon={Upload}
                    onClick={handleImageUpload}
                  >
                    Upload Image
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            icon={Save}
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting to Blockchain...' : 'Submit Batch'}
          </Button>
        </div>
      </form>
    </Card>
  );
};
